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
* keep

---

- [ ] did toggleTaskList

* keep

## bullet list to ordered list

* toggleOrderedList
* keep

---

1. did toggleOrderedList
2. keep


## removes the list when toggling task off

* [ ] toggleTaskList

---

did toggleTaskList

## creates a bullet list

toggleBulletList

---

- did toggleBulletList

## Splits bullet list when turning one item into task

* toggleTaskList
* not todo

---

- [ ] did toggleTaskList

* not todo

## toggles two list items separately

* toggleTaskList
* not todo
* toggleTaskList

---

- [ ] did toggleTaskList

* not todo

- [ ] did toggleTaskList

## toggle off task list item should turn it into normal list item

* not todo
* [ ] toggleTaskList

---

* not todo

did toggleTaskList

---

* not todo
* toggleTaskList

