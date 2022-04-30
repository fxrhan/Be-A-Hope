import smartpy as sp

class Project(sp.Contract):
    def _init_(self):
        self.init_type(sp.TRecord(funding=sp.TMap(k=sp.TAddress, v=sp.TMutez), owner=sp.TAddress, goalAmount=sp.TMutez, endTime=sp.TTimestamp, name=sp.TString, description=sp.TString))


class Crowdfunding(sp.Contract):
    def _init_(self):
        self.project = Project()
        self.init(projects=sp.map(
            tkey=sp.TAddress,
            tvalue=sp.TRecord(
                owner=sp.TAddress,
                goalAmount = sp.TMutez,
                endTime=sp.TTimestamp,
                name=sp.TString,
                description=sp.TString)))
    
        
    @sp.entry_point
    def add_project(self, description, endTime, goalAmount, name):
        project_data = sp.local('project_data',sp.record(funding=sp.map(tkey=sp.TAddress, tvalue=None),owner=sp.sender, goalAmount=goalAmount, endTime=endTime, name=name, description=description))
        address = sp.local('address', sp.create_contract(
                storage = project_data.value,
                contract = self.project))
        self.data.projects[address.value] = sp.record(owner=sp.sender, goalAmount=goalAmount, endTime=endTime, name=name, description=description)
        


if "templates" not in _name_:
    alice = sp.test_account("Alice")
    bob = sp.test_account("Bob")
    cat = sp.test_account("Cat")
    @sp.add_test(name = "Crowfunding")
    def test():
        c1 = Crowdfunding()
        scenario = sp.test_scenario()
        scenario.h1("Crowdfunding")
        scenario += c1
        scenario.h1("Adding Project 1")
        c1.add_project(goalAmount=sp.tez(10),endTime=sp.timestamp_from_utc(2021, 10, 29, 4, 45, 59),name=sp.string("Example Crowdfund"), description=sp.string("Example description")).run(sender=bob)
        scenario.h1("Adding Project 2")
        c1.add_project(goalAmount=sp.tez(20),endTime=sp.timestamp_from_utc(2021, 10, 29, 5, 45, 59),name=sp.string("Example Crowdfund 2"), description=sp.string("Example description 2")).run(sender=bob)
        scenario.show(c1.data.projects)
    sp.add_compilation_target("Crowdfunding",Crowdfunding())