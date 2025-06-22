from flask import Flask, request, jsonify
from ultralytics import YOLO
import os
from werkzeug.utils import secure_filename
import uuid
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config['UPLOAD_FOLDER'] = 'uploads'

model = YOLO('best.pt')  # load trained model

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file'}), 400

    file = request.files['image']
    filename = secure_filename(file.filename)
    unique_filename = str(uuid.uuid4()) + "_" + filename
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
    file.save(filepath)

    print("📥 File saved to:", filepath)
    results = model.predict(source=filepath, conf=0.1)
    predictions = []

    for r in results:
        for box in r.boxes:
            class_id = int(box.cls[0])
            confidence = float(box.conf[0])
            predictions.append({
                'class': model.names[class_id],
                'confidence': round(confidence, 2)
            })

    print("✅ Predictions:", predictions)
    return jsonify({'predictions': predictions})

if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(debug=True)
