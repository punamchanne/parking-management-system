
import easyocr
import cv2
import numpy as np

class PlateReader:
    def __init__(self, languages=['en']):
        # Initialize the EasyOCR reader
        self.reader = easyocr.Reader(languages, gpu=False) # Use GPU if available

    def extract_plate(self, image, bbox):
        """
        Extracts number plate text from a given bounding box in an image.
        bbox: [x1, y1, x2, y2]
        """
        x1, y1, x2, y2 = map(int, bbox)
        
        # Crop the plate from the image
        plate_roi = image[y1:y2, x1:x2]
        
        if plate_roi.size == 0:
            return None
            
        # Optional: Preprocessing for better OCR
        # plate_gray = cv2.cvtColor(plate_roi, cv2.COLOR_BGR2GRAY)
        
        # Perform OCR
        results = self.reader.readtext(plate_roi)
        
        # Look for the best result
        text = ""
        max_conf = 0
        for (bbox, res_text, res_conf) in results:
            if res_conf > max_conf:
                max_conf = res_conf
                text = res_text
        
        return text.strip() if text else None

# Pre-initialized object
plate_reader = PlateReader()
