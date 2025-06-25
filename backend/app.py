from flask import Flask, request, jsonify
from ultralytics import YOLO
import os
import base64
import uuid
import cv2
import numpy as np
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

model = YOLO('best.pt')  # Loaded trained YOLOv8 model


# Route 1: Predict from uploaded image
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file'}), 400

    file = request.files['image']
    filename = secure_filename(file.filename)
    unique_filename = f"{uuid.uuid4()}_{filename}"
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
    file.save(filepath)

    results = model.predict(source=filepath, conf=0.25)
    predictions = []

    for r in results:
        for box in r.boxes:
            class_id = int(box.cls[0])
            confidence = float(box.conf[0])
            predictions.append({
                'class': model.names[class_id],
                'confidence': round(confidence, 2)
            })

    return jsonify({'predictions': predictions})


# Route 2: Predict from base64-encoded live webcam frame
@app.route('/predict-frame', methods=['POST'])
def predict_frame():
    data = request.get_json()
    if 'image' not in data:
        return jsonify({'error': 'No image data provided'}), 400

    try:
        image_data = data['image'].split(',')[1]  # Remove base64 header
        img_bytes = base64.b64decode(image_data)
        np_arr = np.frombuffer(img_bytes, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        results = model.predict(source=frame, conf=0.25)
        predictions = []

        for r in results:
            for box in r.boxes:
                class_id = int(box.cls[0])
                confidence = float(box.conf[0])
                predictions.append({
                    'class': model.names[class_id],
                    'confidence': round(confidence * 100, 2)
                })

        return jsonify({'predictions': predictions})

    except Exception as e:
        return jsonify({'error': f'Failed to process image: {str(e)}'}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5001)
