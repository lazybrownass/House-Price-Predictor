from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="house-price-predictor",
    version="0.1.0",
    author="Awab Ul Mujtaba",
    author_email="your.email@example.com",  # Replace with your email
    description="A machine learning model for predicting house prices",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/lazybrownass/House-Price-Predictor",
    packages=find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.8",
    install_requires=[
        "fastapi==0.95.2",
        "uvicorn==0.22.0",
        "pydantic==1.10.7",
        "numpy==1.26.4",
        "scikit-learn==1.6.1",
        "joblib==1.3.2",
        "pandas==1.5.3"
    ],
) 