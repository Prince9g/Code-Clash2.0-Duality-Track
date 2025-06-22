// React Vite + Tailwind Frontend for YOLOv8 Flask Backend

import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setPredictions([]);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://127.0.0.1:5000/predict', formData);
      const preds = res.data.predictions || [];
      setPredictions(preds);

      if (preds.length === 0) {
        setError('No objects detected.');
      }
    } catch (err) {
      console.error('Backend error:', err);
      setError('Prediction failed due to backend error.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">🚀 Space Object Detector</h1>

        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />

        {preview && (
          <img src={preview} alt="Preview" className="w-full rounded mb-4" />
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Detecting...' : 'Predict'}
        </button>

        {error && (
          <div className="mt-4 text-center text-red-500">{error}</div>
        )}

        {predictions.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Predictions:</h2>
            <ul className="space-y-2">
              {predictions.map((p, idx) => (
                <li key={idx} className="bg-gray-50 border p-2 rounded">
                  <strong>{p.class}</strong> – Confidence: {p.confidence}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}