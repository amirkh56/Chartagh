# uv run --with python-telegram-bot python test_format.py
import sys, types
sys.modules["workers"] = types.SimpleNamespace(Response=None, WorkerEntrypoint=object)
sys.path.insert(0, "src")
from entry import format_entry

t = format_entry({"name": "<b>x</b>", "contact": "a@b.c", "services": ["برند", "سایت"], "message": "سلام & خوبی"})
assert "&lt;b&gt;x&lt;/b&gt;" in t and "برند، سایت" in t and "&amp;" in t and "بودجه" not in t
print("ok")
