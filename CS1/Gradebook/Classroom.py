from Student import Student


class Classroom(object):
    def __init__(self, name, class_day, roster):
        self.name = name
        self.class_day = class_day
        self.roster = roster
        self.assignments = {}


    def add_student(self, student_name):

        if student_name in self.roster:
            print(student_name + " is already on the roster.")
            return False
        else:
            self.roster[student_name] = Student(student_name)
            print("Added " + student_name + " to " + self.name + " roster.")

    def rm_student(self, stud_name):
        if stud_name in self.roster:
            self.roster.pop(stud_name)
            print("Successfully deleted " + stud_name)
        else:
            print("This Student Do Not Exist")
            return False

    def show_roster(self):
        for students in self.roster:
            print(students)
    
    def add_assignment(self, new_assignment, score):
        if new_assignment in self.assignments:
            print("This assignment already exist!")
            return False
        else:
            self.assignments[new_assignment] = score
        print("Successfully Added Assignment")
    
    def rm_assignment(self, assignment_name):
        if assignment_name in self.assignments:
            del self.assignments[assignment_name]
            print("Successfully Deleted Assignment")
        else:
            print("This assignment does not exist")
            return False

    def show_assignment(self):
        for assignment in self.assignments:
            print(assignment)
    
    def meet_days_time(self):
        print("Class will meet on " + self.class_day)