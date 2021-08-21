# excel2md
Преобразовать таблицу с табуляциями в таблицу markdown.

#№# Пример

До:  
1	9/8/2015	Get Groceries  
2	9/8/2015	Call Mom  
3	9/8/2015	Get Dentist Appointment  
4	9/8/2015	Pay Electricity Bill  



После:
||||
| --- | --- | --- |
|1|9/8/2015|Get Groceries|
|2|9/8/2015|Call Mom|
|3|9/8/2015|Get Dentist Appointment|
|4|9/8/2015|Pay Electricity Bill|

### Примечания

По состоянию на 2021/08/22 таблица будет преобразована в том случае, если у нее есть более чем 3 строки.  
JS-код написан плохо, но он работает.  
