import os
os.chdir('D:\CODEX')
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np


dataset = pd.read_csv('gmaps.csv',encoding='windows-1252')
X = dataset.iloc[:, 1].values
X = pd.DataFrame(X)
y = dataset.iloc[:, 2].values


from sklearn.preprocessing import LabelEncoder
labelencoder_y = LabelEncoder()
y = labelencoder_y.fit_transform(y)

# Splitting the dataset into the Training set and Test set
from sklearn.cross_validation import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.3, random_state = 0)

from sklearn.preprocessing import LabelEncoder, OneHotEncoder
labelencoder = LabelEncoder()
X.values[:, 0] = labelencoder.fit_transform(X.values[:, 0])
onehotencoder = OneHotEncoder(categorical_features = [0])
X = onehotencoder.fit_transform(X).toarray()

X = X[:, 1:]
#from sklearn.linear_model import LinearRegression
#regressor = LinearRegression()
#regressor.fit(X_train,y_train)

#from sklearn.svm import SVC
#classifier = SVC(kernel = 'linear',random_state = 0)
#classifier.fit(X_train,y_train)

from sklearn.linear_model import LogisticRegression
classifier = LogisticRegression()
classifier.fit(X_train, y_train)


y_pred = classifier.predict(X_test)

from sklearn.metrics import confusion_matrix
cm = confusion_matrix(y_test, y_pred)

#98.24% accuaracy rate

