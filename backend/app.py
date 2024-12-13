from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze():
    # Check if the file is present in the request
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']

    response = {
        "nutrition_data": {
            "product_name": "Chicken Biryani",
            "serving_size": "1 cup (about 200g)",
            "calories": "350 kcal",
            "ingredients": [
                "Basmati rice",
                "Chicken pieces",
                "Onions",
                "Tomatoes",
                "Yogurt",
                "Ginger-garlic paste",
                "Biryani masala",
                "Mint leaves",
                "Cilantro",
                "Salt",
                "Oil or ghee",
                "Whole spices (cinnamon, cardamom, cloves, bay leaves)"
            ],
            "macronutrients": {
                "fat": "15 g",
                "saturated_fat": "5 g",
                "cholesterol": "70 mg"
            },
            "carbohydrates": {
                "total": "0 g",
                "sugar": "2 g"
            },
            "protein": "20 g",
            "micronutrients": {
                "Vitamin A": "600 IU",
                "Vitamin C": "5 mg",
                "Calcium": "50 mg",
                "Iron": "2.5 mg"
            }
        }
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
