import sys
print(sys.executable)
try:
    import sklearn
    print("sklearn is installed")
except ImportError:
    print("sklearn is NOT installed")

try:
    import numpy
    print("numpy is installed")
except ImportError:
    print("numpy is NOT installed")
