import Student


class Classroom(object):
    def __init__(self, name, class_day, roster):
        self.name = name
        self.class_day = class_day
        self.roster = roster
        self.assignment = {}


def add_student(self, stud_name):
    if stud_name in self.roster:
        print(stud_name + " is already in the class")
        return False
    else:
        self.roster[stud_name] = Student[stud_name]
        for assignment in self.assignments:
            self.roster[stud_name].scores[assignment_give] = -1
        print("Added " + student_name + " to " + self.name + " roster.")
