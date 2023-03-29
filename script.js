
let workTitle = document.getElementById('work');
let breakTitle = document.getElementById('break');

let workTime = 25;
let breakTime = 5;
let longBreakTime = 15;

let seconds = "00"

// display
window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    workTitle.classList.add('active');
}

// start timer
function start() {
    // change button
    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";

    // change the time
    seconds = 59;

    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;
    let longBreakMinutes = longBreakTime - 1;

    breakCount = 1;

    // countdown
    let timerFunction = () => {
        //change the display
        document.getElementById('minutes').innerHTML = workMinutes < 10 ? '0' + workMinutes : workMinutes;
        document.getElementById('seconds').innerHTML = seconds < 10 ? '0' + seconds : seconds;

        // start
        seconds = seconds - 1;
       
        

        if(seconds === 0) {
            workMinutes = workMinutes - 1;
            if(workMinutes === -1 ){
                breakCount++
                if(breakCount % 2 === 0) {
                    // start break
                    workMinutes = breakMinutes;
                    if(breakCount % 3 ===0 ){
                        workMinutes = longBreakMinutes;
                    }
                    // change the painel
                    workTitle.classList.remove('active');
                    breakTitle.classList.add('active');
                    showNotification("Break Time", "Time for a break!");
                }else {
                    // continue work
                    workMinutes = workTime-1;
                    
                    // change the painel
                    breakTitle.classList.remove('active');
                    workTitle.classList.add('active');
                    showNotification("Work Time", "Time to get back to work!");
                }
            }
            seconds = 59;
        }
    }

    // start countdown
    setInterval(timerFunction, 1000); // 1000 = 1s
}

function showNotification(title, message) {
    // check if browser supports notifications
  if ("Notification" in window) {
    // request permission to show notifications
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        // create a notification
        var notification = new Notification(title, { body: message, icon : 'icon128.png'});

        // automatically close the notification after 5 seconds
        setTimeout(notification.close.bind(notification), 5000);
      }
    });
  }
}
   

  