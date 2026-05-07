## Keeps homogeneous lists together 

* foo
* bar

1. one
2. two

* [ ] todo
* [x] done

---

* foo
* bar

1. one
2. two

* [ ] todo
* [x] done

## Splits mixed lists with empty lines

* foo
* bar
* [ ] todo
* [x] done
1. one
2. two

---

* foo
* bar

* [ ] todo
* [x] done

1. one
2. two

## bullet list to task list

* toggleTaskList
* two
* three

---

* [ ] did toggleTaskList
* [ ] two
* [ ] three

## numbered list to task list

1. toggleTaskList
2. two
3. three

---

- [ ] did toggleTaskList
- [ ] two
- [ ] three

## bullet list to ordered list

* toggleOrderedList
* keep

---

1. did toggleOrderedList
2. keep

## task list to bullet list

* [ ] one
* [ ] toggleBulletList
* [ ] three

---

* one
* did toggleBulletList
* three

## removes the list when toggling task off

* [ ] toggleTaskList

---

did toggleTaskList

## creates a bullet list

toggleBulletList

---

- did toggleBulletList

## toggle off task list item should turn it into normal list item

* not todo
* [ ] toggleTaskList

---

* not todo

did toggleTaskList
