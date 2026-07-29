import sys
import os
print('cwd:', os.getcwd())
print('sys.path[0]:', sys.path[0])
for i,p in enumerate(sys.path[:5]):
    print(i, p)
try:
    import backend
    print('backend module:', backend)
    print('backend file:', getattr(backend,'__file__',None))
except Exception as e:
    print('import backend failed:', e)
    raise
