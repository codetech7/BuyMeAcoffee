// SPDX-License-Identifier: MIT LICENSE
pragma solidity ^0.8.9;

contract HelloWorld{
    string greeting;

    function setGreeting(string memory _greeting) public{
        greeting=_greeting;
    }

    //method to output the greeting that was set
    function getGreeting() public view returns(string memory){
        return greeting;
    }
}