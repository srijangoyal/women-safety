import os
import pandas as pd
import dill as pickle
from flask import Flask, jsonify, request, render_template

app = Flask(__name__)


@app.route('/')
def index():
	#initModel()
	print("init")
	#render out pre-built HTML file right on the index page
	return render_template("index.html")


@app.route('/predict', methods=['POST'])
def apicall():
	try:
		test_json = request.get_json()
		test = pd.read_json(test_json, orient='records')
	except Exception as e:
		raise e

	clf = 'model.pk'

	if test.empty:
		return(bad_request())
	else:
		#Load the saved model
		print("Loading the model...")
		loaded_model = None
		with open('./models/'+clf,'rb') as f:
			loaded_model = pickle.load(f)

		print("Doing predictions now...")
		predictions = loaded_model.predict(test)

		responses = jsonify(predictions=predictions.to_json(orient="records"))
		responses.status_code = 200

		return (responses)


@app.errorhandler(400)
def bad_request(error=None):
    message = {
        'status': 400,
        'message': 'Bad Request: ' + request.url + '--> Please check your data payload...',
    }
    resp = jsonify(message)
    resp.status_code = 400
    return resp
