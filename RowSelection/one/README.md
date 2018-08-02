Sample applicaton to reproduce the performance issue for selectinng the rows on rendering 

## Steps to install
1. need node installed any latest
2. then ```npm i``` to install packages
3. then ```npm start``` to start react application 

## Steps to observe

### Scenario 1:
1. When application is loaded ``Person`` tab is selected 
2. On this select group/individual rows and observe the console logs 
3. You would find change and onSelectionChange triggering once followed by render 

### Scenario 2:
1. Now select all from ``People`` tab and switch tab to ```Places``` 
2. Switch back to ```People``` tab you would find in logs render method getting executed equal to number of selection rows.




