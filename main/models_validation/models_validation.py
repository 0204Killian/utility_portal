import re

def is_name_valid(name: str) -> bool:
    """returns true if only alphabethic chars are found (excluding white space).

    - name can't start with space
    - name can't have have two consecutive spaces
    - names can't have a space between 2 individual alphabethic chars.
    """
    try:
        name.lstrip().rstrip()
        if len(name) >= 2:
            if bool(re.search(r'[^A-Za-z|\s]', name)) == False:
                if bool(re.search(r'^[A-Za-z]{1}\s', name)) == False:
                    if bool(re.search(r'\s{1,}[A-Za-z]{1}\s+', name)) == False:
                        if bool(re.search(r'\s{2,}', name)) == False:
                            return True
        return False
    except:
        return False


def is_password_valid(pw: str) -> bool:
    """ checks to see if a password conforms to the following guidelines:
        
    - length between 8 and 20 chars
    - password must have one of the following:
            - upper char
            - lower char,
            - digit.

    passwords can contain special chars that are within SPECIAL_CHARS string variable:
    - !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
    """
    try:
        SPECIAL_CHARS = "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
        # trim start and end white space
        pw = pw.rstrip().lstrip()
        # Test to see if there's any white space left
        if pw.isspace() == False:
            # Test to see if the password length is between 8 and 20 inclusive
            if len(pw) >= 8 and len(pw) <= 20:
            # Test to see if the string is ASCII
                if pw.isascii():
                    # Test to see does the password contain at least 1 number, 1 upper char, and 1 lower char
                    if bool(re.match(r'\w*[A-Z]\w*', pw)):
                        if bool(re.match(r'\w*[a-z]\w*', pw)):
                            if re.search(r'\d', pw) is not None:
                                # Test to see does the string contain unpermitted chars
                                if special_char_checker(pw, SPECIAL_CHARS):
                                    return True              
        return False
    except:
        return False          


def special_char_checker(string, permitted_chars: str) -> bool:
    """function to test for special chars and whether they're permitted.
    
    returns True if no non-permittable chars are found, else False.

    permittable chars:
    - alphabethic
    - numeric
    - chars within permitted_chars"""
    try:
        for c in string:
            if c.isalpha() == False and c.isdigit() == False:
                if c not in permitted_chars:
                    return False
        return True
    except:
        return False


def is_email_valid(email, valid_domains:list=["@entegro.ie"]) -> bool:
    """function to validate emails.

    rules for a valid email:
    - Allows for alphabethic / digit chars
    - Allows for special chars (common ones found on keyboard)
    - email must not start with special chars
    - email must not have two consecutuve same-value special chars e.g '..' or '^^' 
    """
    try:

        PERMITTED_CHARS = "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"

        # strip left and white space
        email = email.lstrip().rstrip()

        # test to see if there's any white space in the string, if True return False
        if email.isspace(): return False
        
        # get the user_name -> start of string up to but not including the index that has the last occurrence of @
        user_name = email[: email.rindex("@")]

        # domain name is the last occurrence of @ until end of email
        domain = email[email.rindex("@"):]

        # if the domain not in domain names return false
        if domain not in valid_domains: return False
        
        # finally validate 'recipient name' i.e the chars that preceed the domain (user_name variable)

        # user_name must be between 2 and 60 chars inclusive
        if len(user_name) < 2 or len(user_name) > 60:
            return False

        # check to see does user_name contain permitted chars
        if special_char_checker(user_name, PERMITTED_CHARS) == False: return False

        # user_name must not start with a special char
        if user_name[0].isalpha() == False and user_name[0].isdigit() == False: return False

        # user_name must not have two same-value consecutive chars that are special chars
        # iterate as long as i is not the last index of user_name
        for i in range(0, len(user_name)):
            if i != len(user_name) -1:
                if user_name[i] == user_name[i+1] and user_name[i] in PERMITTED_CHARS:
                    return False
        return True
    except:
        return False

