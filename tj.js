UsersList2 = new Mongo.Collection('users2');

if(Meteor.isClient){

    Meteor.subscribe('theUsers');

    Template.TipJar.helpers({
        'recipient': function(){
            var currentUserId = Meteor.userId();
            return UsersList2.find({createdBy: currentUserId},
                                   {sort: {balance: -1, name: 1}});
        },
        'selectedClass': function(){
            var userId = this._id;
            var selectedUser = Session.get('selectedUser');
            if(userId == selectedUser){
                return "selected"
            }
        },
        'showSelectedUser': function(){
            var selectedUser = Session.get('selectedUser');
            return UsersList2.findOne(selectedUser);
        },
    });

    Template.TipJar.events({
        // events go here

        'click .user': function(){
            var userId = this._id;
            Session.set('selectedUser', userId);
        },
        'click .increment': function(){
            var selectedUser = Session.get('selectedUser');
            Meteor.call('modifyUserBalance', selectedUser, 5);
        },
        'click .decrement': function(){
            var selectedUser = Session.get('selectedUser');
            Meteor.call('modifyUserBalance', selectedUser, -5);
        },
        'click .remove': function(){
            var selectedUser = Session.get('selectedUser');
            Meteor.call('removeUserData', selectedUser);
        }
    });

    Template.addUserForm.events({
        'submit form': function(event){
            event.preventDefault();
            var userNameVar = event.target.UserName.value;
            Meteor.call('insertUserData', userNameVar);
        }
    });
}

if(Meteor.isServer){
    Meteor.publish('theUsers', function(){
        var currentUserId = this.userId;
        return UsersList2.find({createdBy: currentUserId})
    });

    Meteor.methods({
        'insertUserData': function(userNameVar){
            var currentUserId = Meteor.userId();
            UsersList2.insert({
                name: userNameVar,
                balance: 0,
                createdBy: currentUserId
            });
        },
        'removeUserData': function(selectedUser){
            UsersList2.remove({_id: selectedUser, createdBy: currentUserId});
        },
        'modifyUserBalance': function(selectedUser, value){
            var currentUserId = Meteor.userId();
            UsersList2.update({_id: selectedUser, createdBy: currentUserId},
                              {$inc: {balance: value}});
        }
    });
}


