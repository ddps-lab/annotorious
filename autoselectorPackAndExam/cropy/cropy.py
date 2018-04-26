from PIL import Image as CROPPER
import simplejson as JSON
import os, sys

class CropImage():
	
	def start_crop(self, imgSrc):
		#Openning image file use to PIL lib.
		img = CROPPER.open(imgSrc)
		print(img.size)
		generator = self.crop("img1.json", img)


		while True:
			next(generator)

	def crop(self, jsonSrc, img):
		lines = open(jsonSrc)
		width = img.getbbox()[2]
		height = img.getbbox()[3]
		
		print("pixel : " + str(img.getbbox()))

		for line in lines:

			jsonData = JSON.loads(line, dict) #json to str.
			tag = jsonData['tag']
			x = jsonData["imageLocation"].split("/")
			
			rowSize = len(x)
			imgName = x[rowSize - 1].split(".")[0]
			
			perX = jsonData['anno']['x']
			perY = jsonData['anno']['y']
			perWidth = jsonData['anno']['width']
			perHeight = jsonData['anno']['height']
			
			setX = perX * width
			setY = perY * height
			setWidth = (perWidth *  width) + setX
			setHeight = (perHeight * height) + setY

			print(str(setX) + ":" + str(setY) + " " + str(setWidth)
				+ ":" + str(setHeight))
			#print(str(int(setWidth)) + "  " + str(int(setHeight)))
			
			yield self.annotation(img, tag, imgName, setX, setY, setWidth, setHeight) #generate function.
	

	def annotation(self, img, tag, name, X, Y, W, H):
		cropping = img.crop((X, Y, W ,H))
		
		i = 0
		while True:
			saveName = name + "_" + tag + "_" + str(i) + ".jpg"

			isFile = os.path.exists(saveName)
			if isFile != True:
				cropping.save(saveName,"JPEG")
				return saveName
			
			i = i + 1




if __name__ == "__main__":
	crop = CropImage()
	#test image src
	img = "img1.jpg"
	#def getImage()

	crop.start_crop(img)


