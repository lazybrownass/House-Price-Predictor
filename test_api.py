import requests
import json

# Test data for a house with all 15 features
test_data = {
    "features": [
        2000,   # size
        3,      # bedrooms
        2,      # bathrooms
        2010,   # year_built
        0,      # has_basement (0=No)
        1,      # has_garage (1=Yes)
        0,      # has_pool (0=No)
        2,      # condition (2=Good)
        1,      # stories
        1,      # parking_spaces
        0,      # has_fireplace (0=No)
        1,      # has_air_conditioning (1=Yes)
        500,    # lot_size
        3,      # rooms
        1       # has_view (1=Yes)
    ]
}

# Send POST request to the prediction endpoint
response = requests.post(
    "http://localhost:8001/predict",
    json=test_data
)

# Print the response
print("\nTest Data:")
print(f"Size: {test_data['features'][0]} sq ft")
print(f"Bedrooms: {test_data['features'][1]}")
print(f"Bathrooms: {test_data['features'][2]}")
print(f"Year Built: {test_data['features'][3]}")
print(f"Has Basement: {'Yes' if test_data['features'][4] == 1 else 'No'}")
print(f"Has Garage: {'Yes' if test_data['features'][5] == 1 else 'No'}")
print(f"Has Pool: {'Yes' if test_data['features'][6] == 1 else 'No'}")
print(f"Condition: {test_data['features'][7]}")
print(f"Stories: {test_data['features'][8]}")
print(f"Parking Spaces: {test_data['features'][9]}")
print(f"Has Fireplace: {'Yes' if test_data['features'][10] == 1 else 'No'}")
print(f"Has Air Conditioning: {'Yes' if test_data['features'][11] == 1 else 'No'}")
print(f"Lot Size: {test_data['features'][12]} sq ft")
print(f"Rooms: {test_data['features'][13]}")
print(f"Has View: {'Yes' if test_data['features'][14] == 1 else 'No'}")
print("\nResponse:")
print(json.dumps(response.json(), indent=2)) 