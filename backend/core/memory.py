import json
import os

# ==== Mix Memory Loader ====
CONFIG_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "mix.config.json")

def load_memory():
    """
    Load the central memory / configuration of Mix Platform
    Returns a dictionary with platform settings
    """
    if not os.path.exists(CONFIG_PATH):
        raise FileNotFoundError(f"Mix config file not found at {CONFIG_PATH}")

    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        config = json.load(f)

    return config


def save_memory(config):
    """
    Save the current memory/configuration back to mix.config.json
    """
    with open(CONFIG_PATH, "w", encoding="utf-8") as f:
        json.dump(config, f, indent=2, ensure_ascii=False)


def verify_modules(config):
    """
    Verify that all required modules are enabled
    Returns True if all required modules are present
    """
    required_modules = ["social", "store", "wallet", "games", "metaverse", "matrix", "gps", "ai", "tv_radio"]
    modules = config.get("modules", {})

    missing = [m for m in required_modules if not modules.get(m, False)]
    if missing:
        print(f" Missing modules in config: {missing}")
        return False

    return True


def init_memory():
    """
    Initialize Mix memory: load and verify
    """
    try:
        config = load_memory()
    except FileNotFoundError:
        print(" Mix config.json not found! Please create it before running Mix.")
        return None

    if not verify_modules(config):
        print(" Some modules are missing in Mix config.json.")
        return None

    print(" Mix memory loaded successfully.")
    return config
