from datetime import date, datetime, timedelta
from typing import Any, Literal, Union

""""File contains utility functions, most of which work with dates."""

""" functionality for dates """

def get_date_range(start: str, end: str) -> list[str]:
    """function to return an array of str represented date objects between args for start and end (inclusive)."""
    try:
        d1 = datetime.strptime(start, "%Y-%m-%d")
        d2 = datetime.strptime(end , "%Y-%m-%d")
        date_range = []

        for days in range((d2-d1).days +1):
            date_range.append(str((d1 + timedelta(days)).date()))
        
        return date_range
    except:
        return None

def add_days_to_date(date: datetime, days_add: int) -> datetime:
    """function to add days_add number of days to date and return it."""
    try:
        return (date + timedelta(days_add)).date()
    except:
        return None

            
def get_week_start_and_end_dates(date) -> list[str]:
    """ function to return the start and end dates in the week that date resides in.

    returns List of length 2:

    - index 0: start of week str represented date.
    - index 1: end of week str represented date."""
    try:
        day_num = date.weekday()
        end_day_num = 6 - day_num

        start_date = date - timedelta(days=day_num)
        end_date = date + timedelta(days=end_day_num)
        return [
            start_date.strftime("%Y-%m-%d"),
            end_date.strftime("%Y-%m-%d")]
    except:
        return []

def get_week_headers(date_range: list[str]) -> list[str]:
    """function to return headers for a week.

    header format: 'day date/month' e.g 'Mon 01/05'.

    Expects a list of string represented dates for a given week.

    Expected string date format 'YYYY-mm-dd'."""
    try:
        headers = []
        abbrevs = [
            "Mon", "Tue", "Wed",
            "Thu", "Fri", "Sat", "Sun"]
        i = 0
        for d in date_range:
            sp = d.split("-")
            headers.append(f"{abbrevs[i]} {sp[2]}/{sp[1]}")
            i+=1
        return headers
    except:
        return None

def get_date_from_string(date_str: str)-> date:
    """creates and returns a date object generated from date_str.
    
    expected formats:

    - YYYY-mm-dd

    or 

    - dd-mm-YYYY"""
    try:
        comps = date_str.split("-")
        month = int(comps[1])
        year = day = None

        if len(comps[0]) == 4:
            year = int(comps[0])
            day = int(comps[2])
        else:
            year = int(comps[2])
            day = int(comps[0])

        return date(year, month, day)
    except:
        return None


def get_string_from_date(dateobj: date) -> str:
    """returns a date represented as a string.

    format of returned string: YYYY-mm-dd."""

    return dateobj.strftime("%Y-%m-%d")


def get_week_number(value: date) -> int:
    """returns the week number that value resides in."""
    return value.isocalendar()[1]

""" other """

def get_display_name(name) -> str:
    """returns a capitalised name for display purposes."""
    try:
        x = ""
        x.lower().cap
        splitter = name.rstrip().lstrip().split(" ")
        splitter = [s.lower().capitalize() for s in splitter]
        return splitter.join(" ")
    except:
        try:
            return name.lower().capitalize()
        except:
            return name

def get_distinct_vals(collection: Union[list, set, tuple], index: int):
    """ function to return all distinct values at a given index in collection.

    expects collection to be a 2D."""
    try:
        d = []
        for c in collection:
            v = c[index]
            if v not in d:
                d.append(v)
        return d
    except:
        return None

def is_float(element: Any) -> bool:
    """returns True if elementcan be converted to type float."""
    try:
        float(element)
        return True
    except:
        return False