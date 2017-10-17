import random

bank_account = 1000

green = [0, 37]
red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
black = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]

def which_bet():
    #User pick between color bet vs number or both
    bet_choice = ''
    while bet_choice != 'number' and bet_choice != 'color' and bet_choice != 'both':
        bet_choice = input("Bet on number, color, or both? ")
        print("-------------------------------------")
    return bet_choice


def take_bet():
    bet_amount = 0
    while bet_amount <= 0 or bet_amount > bank_account:
        # bet_amount = int(input("Place your bet amount: $"))
        try:
            bet_amount = int(input("Place your bet amount: $"))
        except ValueError:
            print("Enter a valid number.")
        print("-------------------------------------")
    return bet_amount

def take_number():
    bet_number = 100
    while bet_number > 37 or bet_number < 0:
        try:
            bet_number = int(input("What number to bet on? (00 -> 37) "))
        except ValueError:
            print("Enter a valid number.")

        if bet_number == 00:
            bet_number = 37
        else:
            pass
    print("-------------------------------------")
    return bet_number
    
def take_color():
    ball_color = ''
    while ball_color != 'red' and ball_color != 'green' and ball_color != 'black':
        ball_color = input("What color would you like to bet on?(Black, Red, Green) ")
    print("-------------------------------------")
    return ball_color

def roll_ball():
    random_num = random.randint(0,37)
    return random_num

def check_color(roll_ball, take_color):
    ball_color = ''
    if roll_ball in green:
        ball_color = "green"
    elif roll_ball in red:
        ball_color = "red"
    else:
        ball_color = "black"
    
    print("The ball landed on: " + ball_color)

    if take_color == ball_color:
        if take_color == "green":
            return "Green Won"
        elif take_color == "red":
            return "Red Won"
        elif take_color == "black":
            return "Black Won"
        else:
            pass
    else:
        return "Color Lost"

def check_number(ball_number, take_number):
    print("The ball landed on: " + str(ball_number))
    if take_number == ball_number:
        return "Number Won"
    else:
        return "Number Lost"

def payout(bet_amount, result):

    global bank_account

    if result == "Green Won":
        bank_account += bet_amount * 17
        return "You won: $" + str(bet_amount * 17)
    elif result == "Color Lost":
        bank_account -= bet_amount
        return "You lost on Color: $" +str(bet_amount)
    elif result == "Number Won":
        bank_account += (bet_amount * 35)
        return "You won on Number: $" + str(bet_amount * 35)
    elif result == "Number Lost":
        bank_account -= bet_amount
        return "You lost on Number: $" +str(bet_amount)
    else:
        bank_account += bet_amount
        return "You won on Color: $" + str(bet_amount)

def play_again():
    if bank_account <= 0:
        print("Sorry, you have no more money.")
    else:
        again = input("Would you like to play again? y/n: ")

        while again != "y" and again != "n":
            again = input("Please enter correct choice (y/n): ")

        if again == 'y':
            play_game()
        else:
            print("You have $" + str(bank_account) + " left.")

def play_game():

    bet_type = which_bet()

    if bet_type == "number":
        print("Bank Account: $" + str(bank_account))
        bet_amount_num = take_bet()
        ball_roll = roll_ball()
        number_take = take_number()
        num_result = check_number(ball_roll, number_take)
        print(payout(bet_amount_num, num_result))
        print("Bank Account: $" + str(bank_account))

    elif bet_type == "color":
        print("Bank Account: $" + str(bank_account))
        bet_amount_color = take_bet()
        ball_roll = roll_ball()
        color_take = take_color()
        color_result = check_color(ball_roll, color_take)
        print(payout(bet_amount_color, color_result))
        print("Bank Account: $" + str(bank_account))

    else:
        print("Bank account: $" + str(bank_account))

        ball_roll = roll_ball()

        print("For your bet on the number: ")
        bet_amount_num = take_bet()
        number_take = take_number()
        num_result = check_number(ball_roll, number_take)

        print("For your bet on the color:")
        bet_amount_color = take_bet()
        color_take = take_color()
        color_result = check_color(ball_roll, color_take)

        print(payout(bet_amount_color, color_result))
        print(payout(bet_amount_num, num_result))
        print("bank account: " + str(bank_account))
    
    play_again()

play_game()
        
