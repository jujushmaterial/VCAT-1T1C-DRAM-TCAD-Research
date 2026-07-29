import importlib.util
from pathlib import Path

path = Path(__file__).with_name('sync_dashboard.py')
spec = importlib.util.spec_from_file_location('sync_dashboard', path)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

text = '''
- [ ] <!-- task-id:P01-T01 --> 기준 조건을 정리한다.
  - <!-- output-id:P01-T01-O01 type:files review:recommended --> 조건표
- [x] <!-- task-id:P01-T02 --> 구조를 만든다.
  - <!-- output-id:P01-T02-O01 type:code review:none --> 전체 코드
'''
submissions = {'P01-T02-O01': [{'submissionId': 'test'}]}
tasks = module.parse_tasks(text, 1, submissions)
assert len(tasks) == 2
assert tasks[0]['id'] == 'P01-T01'
assert tasks[0]['outputs'][0]['review'] == 'recommended'
assert tasks[1]['checked'] is True
assert tasks[1]['outputs'][0]['submissions'][0]['submissionId'] == 'test'
outputs = module.flatten_outputs(tasks)
assert len(outputs) == 2
assert outputs[1]['taskId'] == 'P01-T02'
assert sum(1 for item in tasks if item['checked']) == 1
print('sync task-output tests passed')
