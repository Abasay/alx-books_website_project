import cmd
from models import storage
from models.basemodel import BaseModel
class commandline(cmd.Cmd):
    """ command line to test the backend that inherits from Cmd"""
    prompt = "(#command#)"

    def do_EOF(self, line):
        """EOf command handler to exit the command line
        Args:
            line: The entered command
        Return:
            True
        """
        print()
        return True
    
    def do_quit(self, line):
        """exit the command lime.if quit is entered"""
        return True
    def emptyline(self):
        pass

    def do_create(self, class_name):
        """creates new instance for our models(book or user)"""
        if class_name is None or class_name == "":
            print("##class name no dey wetin you type##")
        elif class_name  not in storage.classes():
            print("##Invalid class ")
        else:
            new_instance = storage.classes()[class_name]()
            new_instance.save()
            print(new_instance.id)

    def do_show(self, line):
        """shows a single instance or all instance in storage"""
        args = line.split()
        input_class = ""
        if args:
            input_class= args[0]
        if input_class not in storage.classes():
            print("##Invalid class ")
        elif len(args) < 2:
            print("##why you no add instance id na?##")
        else:
            key = "{}-{}".format(input_class, args[1])
            if key not in storage.all():
                print("##I no see the instance you dey find##")
            else:
                print(storage.all()[key])
                
    def do_all(self, class_name):
        if class_name != "" and  class_name is not None:
            if class_name not in storage.classes():
                print("##invalid class boss##")
            else:
                print([str(val) for key, val in storage.all().items() if val.__class__.__name__ == class_name])
        else:
            print([str(val) for key, val in storage.all().items()])

if __name__ == '__main__':
    commandline().cmdloop()
