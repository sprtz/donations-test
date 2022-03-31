// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;


contract DonationsContract {


    address payable public owner;
    address[] internal donators;
    mapping (address => uint) internal donations;



    constructor() payable {
        owner = payable(msg.sender);
    }


    /**
    Проверка что вызов метода совершает создатель контракта
     */
    modifier onlyOwner() {
        require(
            msg.sender == owner,
             "Only owner can do this");
        _;
    }


    /**
    Выводимая сумма должна быть меньше или равна балансу
     */
    modifier ifBalanceGreatherThanOrEqualTo(
        uint amount) 
    {
        require(
            address(this).balance >= amount,
             "Not enough tokens");
        _;
    }


    /**
    Функция вноса любой суммы
     */
    function donate() 
           public
           payable 
    {
        if(donations[msg.sender] == 0) {
            donators.push(msg.sender);
        }
        donations[msg.sender] += msg.value;
    }


    /**
    Функция вывода любой суммы на любой адрес для владельца
     */
    function withdraw(
        address payable to,
        uint amount) 
         onlyOwner 
         ifBalanceGreatherThanOrEqualTo(amount)
          public 
          payable
    {
        (bool sent, ) = to.call { value: amount }("");
        require(sent, "Failed to transfer Ether");
    }


    /**
    Возвращает список спонсоров
     */
    function getDonators()
     external
      view 
      returns (address[] memory) 
    {
        return donators;
    }


    /**
    Возвращает общую сумму пожертвований для конкретного спонсора
     */
    function totalAmount(
        address from) 
        external
         view 
         returns (uint) 
    {
        return donations[from];
    }

}