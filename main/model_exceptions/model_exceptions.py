class EmailFormatError(Exception):
    def __str__(self):
        return "Invalid email format. Try again."

class NameValueError(Exception):
    def __str__(self):
        return "Value provided for name values must be alphabethic."

class InvalidPasswordError(Exception):
    def __str__(self):
        return "Invalid password. Value submitted was unsuitable."