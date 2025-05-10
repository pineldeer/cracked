from PIL import Image, ImageDraw

def portrait_image(image_path: str, output_path: str) -> None:
    """
    Process the image to create a portrait version.
    """
    # Placeholder for image processing logic
    # For example, using PIL or OpenCV to process the image
    image = Image.open(image_path).convert("L")  # Convert to grayscale

    # Convert to RGB to allow drawing in color (e.g., black lines on gray)
    image = image.convert("RGB")
    draw = ImageDraw.Draw(image)

    width, height = image.size

    draw.line((width // 2, 0, width, width // 2), fill=(0, 0, 0), width=20)
    draw.line((width // 2, 0, 0, width // 2), fill=(0, 0, 0), width=20)

    # Optionally: draw a border or cross symbol
    draw.rectangle([(5, 5), (width - 5, height - 5)], outline=(0, 0, 0), width=3)

    # Save the edited image
    image.save(output_path)
    pass


if __name__ == "__main__":
    portrait_image("./data/uploads/12023 여권사진.jpg", "./data/uploads/12023 여권사진.jpg")