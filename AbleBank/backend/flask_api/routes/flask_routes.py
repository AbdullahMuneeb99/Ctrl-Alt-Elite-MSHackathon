# Example Flask route
from flask import Blueprint

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    return "AbleBank Copilot Flask API running."
