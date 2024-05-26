from flask import Flask, request, jsonify, render_template
from texify.inference import batch_inference
from texify.model.model import load_model
from texify.model.processor import load_processor
from PIL import Image

app = Flask(__name__)

# Load model and processor once when the app starts
model = load_model()
processor = load_processor()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process_image', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'})

    img_file = request.files['image']
    img = Image.open(img_file)
    
    results = batch_inference([img], model, processor)
    return jsonify({'results': results})

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
