import assert from 'node:assert/strict';
import {
  parseTaskSection,
  validateTasks,
  replaceTaskSection,
  serializeTasks,
  flattenOutputs,
  presenceIsOnline
} from '../src/v4.js';

const phase = 2;
const section = `
- [ ] <!-- task-id:P02-T01 --> 기준 조건을 정리한다.
  - <!-- output-id:P02-T01-O01 type:files review:recommended --> 기준 조건표
- [x] <!-- task-id:P02-T02 --> 구조를 만든다.
  - <!-- output-id:P02-T02-O01 type:code review:none --> 전체 SDE 코드
  - <!-- output-id:P02-T02-O02 type:files review:none --> 구조 이미지
`;

const parsed = parseTaskSection(section, phase);
assert.equal(parsed.length, 2);
assert.equal(parsed[0].id, 'P02-T01');
assert.equal(parsed[0].outputs[0].type, 'files');
assert.equal(parsed[0].outputs[0].review, 'recommended');
assert.equal(parsed[1].checked, true);
assert.equal(flattenOutputs(parsed).length, 3);
assert.equal(flattenOutputs(parsed)[2].taskId, 'P02-T02');

const validated = validateTasks(parsed, phase);
assert.equal(validated[1].outputs[1].id, 'P02-T02-O02');
const serialized = serializeTasks(validated);
const reparsed = parseTaskSection(serialized, phase);
assert.deepEqual(reparsed, validated);

const body = `## 1. 해야 할 것\n\n${section}\n## 2. 나와야 하는 결과물\n\n안내\n\n## 3. 과정의 이유\n\n이유`;
const replaced = replaceTaskSection(body, validated);
assert.ok(replaced.includes('task-id:P02-T02'));
assert.ok(replaced.includes('output-id:P02-T02-O02'));
assert.ok(replaced.includes('## 2. 나와야 하는 결과물'));

const now = Date.now();
assert.equal(presenceIsOnline(new Date(now - 30_000).toISOString(), now), true);
assert.equal(presenceIsOnline(new Date(now - 91_000).toISOString(), now), false);
assert.equal(presenceIsOnline('invalid', now), false);

const duplicateInput = [
  { id: 'P02-T01', checked: false, text: 'A', outputs: [{ id: 'P02-T01-O01', text: 'a', type: 'code', review: 'none' }] },
  { id: 'P02-T01', checked: false, text: 'B', outputs: [{ id: 'P02-T01-O01', text: 'b', type: 'bad', review: 'bad' }] }
];
const repaired = validateTasks(duplicateInput, phase);
assert.notEqual(repaired[0].id, repaired[1].id);
assert.notEqual(repaired[0].outputs[0].id, repaired[1].outputs[0].id);
assert.equal(repaired[1].outputs[0].type, 'any');
assert.equal(repaired[1].outputs[0].review, 'none');

console.log('task-output worker tests passed');
