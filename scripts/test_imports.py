import sys
sys.path.append(r'D:\Assement_incuebyte\Car_Dealership_Inventory_')

try:
    import backend.app.core.config as cfg
    import backend.app.core.database as db
    print('DB URL:', cfg.settings.database_url)
    print('Engine present:', hasattr(db, 'engine'))
except Exception as e:
    import traceback
    traceback.print_exc()
    raise
