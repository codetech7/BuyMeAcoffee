// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
// import "hardhat/console.sol";

// contract Lock {
//     uint public unlockTime;
//     address payable public owner;

//     event Withdrawal(uint amount, uint when);

//     constructor(uint _unlockTime) payable {
//         require(
//             block.timestamp < _unlockTime,
//             "Unlock time should be in the future"
//         );

//         unlockTime = _unlockTime;
//         owner = payable(msg.sender);
//     }

//     function withdraw() public {
//         // Uncomment this line to print a log in your terminal
//         // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

//         require(block.timestamp >= unlockTime, "You can't withdraw yet");
//         require(msg.sender == owner, "You aren't the owner");

//         emit Withdrawal(address(this).balance, block.timestamp);

//         owner.transfer(address(this).balance);
//     }
// }

contract buyMeACoffee{

    address payable owner;
    event NewMemo(address indexed from, uint timeStamp, uint amount, string _name, string _message);

    struct Memo{
        address from;
        uint _amount;
        string _name;
        string _message;
        uint timeStamp;
        
    }

    Memo[] memos;

    //  modifier fewRules(string memory _name, string memory _message){
    //     // require(msg.sender == owner, "only the owner can call this function");
    //     require(_name.length > 0, "The name cannot be empty");
    //     require(_message.length > 0, "The message cannot be empty");
    //     _;    
    // }

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }

    constructor (){
        owner = payable(msg.sender);
    }

    function getMemos() public view returns (Memo[] memory){
        return memos;
    }
   

    function buyCoffee(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "Enter a valid amount please, Java(coffee) isn't free");

        memos.push(Memo(msg.sender, msg.value, _name, _message, block.timestamp));

        emit NewMemo(msg.sender, block.timestamp, msg.value, _name, _message);

    }

    function withdrawDonations() public{
        // address payable ower = payable(msg.sender);
        payable(msg.sender).transfer(address(this).balance);
    }

    function checkBalance() public view returns(uint) {
        return address(this).balance;
    }

    function getMiner() public view returns(address){
        return (block.coinbase);
    }




}