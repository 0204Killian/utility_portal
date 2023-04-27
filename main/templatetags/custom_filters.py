from django import template

register = template.Library()

@register.filter
def lookup(dict, key):
    """returns the value for key in dict."""
    try:
        return dict[key]
    except:
        return None

@register.filter
def get_item_at_index(collection, index):
    """returns item at index in collection."""
    try:
        if index > (len(collection) - 1):
            return None
        else:
            return collection[index]
    except:
        return None

@register.filter
def order_list(l) -> list:
    """returns a sorted version of list l"""
    try:
        return sorted(l)
    except:
        return l
