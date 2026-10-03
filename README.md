# 🚀 Space Object Detection using YOLOv8

A real-time computer vision system for detecting critical objects in a space-station environment using **YOLOv8**. The project identifies objects such as **fire extinguishers, toolboxes, and oxygen tanks** from images and video streams.

## ✨ Features

* Real-time object detection using YOLOv8
* Detection of 3 critical space-station objects
* Bounding boxes with confidence scores
* Custom annotated dataset for model training
* Image and video inference support
* Lightweight and suitable for real-time applications

## 🎯 Detected Objects

| Class | Object            |
| ----- | ----------------- |
| 0     | Fire Extinguisher |
| 1     | ToolBox           |
| 2     | Oxygen Tank       |

## 🛠️ Tech Stack

* **Python**
* **YOLOv8**
* **Ultralytics**
* **PyTorch**
* **OpenCV**
* **Computer Vision**

## 📁 Project Structure

```text
Space-Object-Detection/
│
├── dataset/
│   ├── train/
│   ├── valid/
│   └── test/
│
├── runs/
│   └── detect/
│
├── best.pt
├── YOLO_Enhancer.ipynb
├── data.yaml
├── requirements.txt
└── README.md
```

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/<your-username>/<repository-name>.git
cd <repository-name>
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Or install Ultralytics directly:

```bash
pip install ultralytics opencv-python
```

## 🚀 Running the Model

Load the trained YOLOv8 model:

```python
from ultralytics import YOLO

model = YOLO("best.pt")

results = model.predict(
    source="test.jpg",
    conf=0.5,
    show=True
)
```

For webcam detection:

```python
model.predict(source=0, show=True)
```

## 🧠 Model Training

The model was trained using a custom YOLO-format dataset.

Example:

```python
from ultralytics import YOLO

model = YOLO("yolov8n.pt")

model.train(
    data="data.yaml",
    epochs=50,
    imgsz=640
)
```

The trained weights are saved as:

```text
runs/detect/train/weights/best.pt
```

## 📊 Results

The trained model can detect the target objects and return:

* Object class
* Bounding box coordinates
* Confidence score

Example output:

```text
Fire Extinguisher — 0.92
ToolBox          — 0.87
Oxygen Tank      — 0.94
```

> Replace these example confidence values with actual results if you want to showcase specific performance numbers.

## 🔮 Future Improvements

* Improve detection accuracy with a larger dataset
* Add object tracking for video streams
* Optimize the model for edge devices
* Add a real-time monitoring dashboard
* Integrate alerts for critical objects such as fire extinguishers and oxygen tanks

## 👨‍💻 Author

**Prince Sharma**

Computer Science Engineer | Software Developer

---

⭐ If you found this project useful, consider giving the repository a star!
