import os
import sys

def generate_large_file(filename="test-dataset-1gb.bin", size_in_mb=1024):
    """
    Instantly generates a massive dummy binary file using sparse file techniques.
    This allows testing Shelby's hot storage upload UI with 1GB+ files
    without consuming disk RAM or taking minutes for disk I/O.
    """
    print(f"⚡ Generating {size_in_mb}MB payload: {filename}...")
    file_path = os.path.abspath(filename)
    try:
        # Fast method: Truncate file to desired size (sparse file)
        with open(file_path, 'wb') as f:
            f.truncate(size_in_mb * 1024 * 1024)
        print(f"✅ Success! Sparse file created instantly at: {file_path}")
        print(f"👉 Drag and drop '{filename}' into ShelbyDrop UI to test chunked streaming.")
    except Exception as e:
        print(f"Sparse file creation failed ({e}), falling back to chunked zero write...")
        chunk_size = 1024 * 1024 * 10  # 10MB
        chunks = size_in_mb // 10
        with open(file_path, 'wb') as f:
            for _ in range(chunks):
                f.write(b'\0' * chunk_size)
        print(f"✅ Success! File created at: {file_path}")

if __name__ == "__main__":
    size = 1024
    if len(sys.argv) > 1:
        try:
            size = int(sys.argv[1])
        except ValueError:
            pass
    generate_large_file(size_in_mb=size)
