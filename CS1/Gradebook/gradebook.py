from Classroom import Classroom
from Student import Student

def classroom_action(class_name):
    action = ''
    while action != "1" and action != "2" and action != "3":
        action = input("Would you like to: \n1. Add Student \n2. Remove Student \n3. View Class\n")

    if action == "1":
        stud_name = input("What student would you like to add? ")
        class_name.add_student(stud_name)
    elif action == "2":
        student_name = input("Who would you like to be removed? ")
        class_name.rm_student(student_name)
    else:
        class_name.show_roster()

def assignment_action(class_name):
    action = ''
    while action != '1' and action != '2' and action != '3':
        action = input("Would you like to:  \n1. Create Assignment \n2. Delete Assignment \n3. View Assignments\n")
     
    if action == '1':
        assignment_name = input("What is the assignment name? ")
        score = input("What is the assignment out of? (0-100) ")
        class_name.add_assignment(assignment_name, score)
    
    if action == '2':
        assignment_name = input("Delete which assignment?")
        class_name.rm_assignment(assignment_name)
    
    if action == '3':
        class_name.show_assignment()


def show_class_info(class_name):
    action = ''
    while action != "1" and action != "2" and action != "3":
        action = input("Which info would you like to view: \n1. Class time \n2. Scores \n")

    if action == '1':
        class_name.meet_days_time()
    if action == '2':
        assignment_name = input("View which assignment? ")
        pass


def gradeBook():
    class_name = input("Please enter class name: ")
    meet_times = input("What day and time does class meet? (Ex: Friday 4:30PM): ")
    roster = {'': Student('')}
    
    classes = Classroom(class_name, meet_times, roster)

    while True:
        action = ''
        while action != "1" and action != "2" and action != "3":
            action = input("What action would you like to take: \n1. Roster \n2. Assignments \n3. Class Info\n")
        
        if action == '1':
            classroom_action(classes)
        if action == '2':
            assignment_action(classes)
        if action == '3':
            show_class_info(classes)

gradeBook()