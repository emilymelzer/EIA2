namespace Rodelhang {

    window.addEventListener("load", init);

    export let crc2: CanvasRenderingContext2D;

    let objects: DrawObject[] = [];
    let children: Children[] = [];
    let imagedata: ImageData;
    let fps: number = 25;
    let i: number = 0;
    let xMouse: number;
    let yMouse: number;
    let snowball: Snowball;

    function listeners(): void {
        document.getElementById("Anleitung").addEventListener("click", anzeigeCanvas);
        document.getElementsByTagName("canvas")[0].addEventListener("click", mouseEvent);
    }


    function init(): void {

        let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
        crc2 = canvas.getContext("2d");

        listeners();
        drawSky();
        drawHill();
        drawSun();


        drawCloud();
        drawCloud2();
        drawCloud3();

        generateChild();
        generateSlowChildren();
        generateSnow();

        drawScore();
        // generateScore();

        imagedata = crc2.getImageData(0, 0, canvas.width, canvas.height);

        update();
    }


    function anzeigeCanvas() {
        document.getElementsByTagName("canvas")[0].classList.remove("invisible");
        document.getElementsByTagName("div")[0].classList.add("invisible");
    }



    function update(): void {
        crc2.clearRect(0, 0, 1400, 900);
        crc2.putImageData(imagedata, 0, 0);
        window.setTimeout(update, 1000 / fps);


        for (let i: number = 0; i < objects.length; i++) {
            let object: DrawObject = objects[i];
            object.draw();
            object.move();

        }
        if (snowball) {
            if (snowball.xP >= xMouse - 20 && snowball.xP <= xMouse + 20) {
                if (snowball.yP >= yMouse - 20 && snowball.yP <= yMouse + 20) {
                    console.log("ball angekommen");
                    checkIfHit();
                }
            }
        }
    }
    //Schneeball
    function generateSnowball(_xMouse: number, _yMouse: number): void {
        console.log(snowball);


        snowball = new Snowball(_xMouse, _yMouse);
        //            console.log(snowball);
        console.log("neuer schneeball");

        objects.push(snowball);
    }

    function mouseEvent(_event: MouseEvent): void {
        if (!snowball) {
            xMouse = _event.clientX;
            yMouse = _event.clientY;
            generateSnowball(xMouse, yMouse);
        }
    }

    function checkIfHit(): void {
        for (let i: number = 0; i < children.length; i++) {
            if (xMouse >= children[i].xP - 40 && xMouse <= children[i].xP + 0) {
                if (yMouse >= children[i].yP - 10 && yMouse <= children[i].yP + 43) {
                    console.log("kind getroffen");
                }
            }
        }
        for (let i: number = 0; i < objects.length; i++) {
            if (objects[i].typ == "snowball") {
                objects.splice(i, 1);
                console.log("ball löschen");
                console.log(objects[i]);
            }
        }
        snowball = null;
    }

    //Schnee
    function generateSnow(): void {
        for (let i: number = 0; i < 70; i++) {

            let snowflake: Snow = new Snow();
            objects.push(snowflake);
        }
    }

    function generateChild(): void {
        for (let i: number = 0; i < 5; i++) {

            let child: Children = new Children();
            objects.push(child);
            children.push(child);
        }
    }

    function generateSlowChildren(): void {
        for (let i: number = 0; i < 5; i++) {

            let child: slowChildren = new slowChildren();
            objects.push(child);
            children.push(child);
        }
    }

    function drawCloud(): void {
        crc2.beginPath();
        crc2.arc(70, 170, 45, 0, 2 * Math.PI);
        crc2.arc(140, 170, 60, 0, 2 * Math.PI);
        crc2.arc(200, 170, 45, 0, 2 * Math.PI);
        crc2.arc(240, 170, 30, 0, 2 * Math.PI);
        crc2.fillStyle = "#FFFFFF";
        crc2.fill();

    }

    function drawCloud2(): void {
        crc2.beginPath();
        crc2.arc(650, 100, 30, 0, 2 * Math.PI);
        crc2.arc(810, 100, 60, 0, 2 * Math.PI);
        crc2.arc(870, 100, 40, 0, 2 * Math.PI);
        crc2.arc(750, 100, 70, 0, 2 * Math.PI);
        crc2.arc(700, 100, 50, 0, 2 * Math.PI);
        crc2.fillStyle = "#FFFFFF";
        crc2.fill();
    }
    function drawCloud3(): void {
        crc2.beginPath();
        crc2.arc(595, 220, 15, 0, 2 * Math.PI);
        crc2.arc(620, 220, 25, 0, 2 * Math.PI);
        crc2.arc(650, 220, 30, 0, 2 * Math.PI);
        crc2.arc(680, 220, 25, 0, 2 * Math.PI);
        crc2.arc(705, 220, 15, 0, 2 * Math.PI);
        crc2.arc(720, 220, 10, 0, 2 * Math.PI);
        crc2.arc(730, 220, 8, 0, 2 * Math.PI);
        crc2.arc(740, 220, 6, 0, 2 * Math.PI)

        crc2.fillStyle = "#FFFFFF";
        crc2.fill();
    }


    function drawSky(): void {
        crc2.moveTo(0, 100);
        crc2.beginPath();

        crc2.lineTo(1400, 800);
        crc2.lineTo(1400, 0);
        crc2.lineTo(0, 0);
        crc2.lineTo(0, 370);
        crc2.closePath();

        var grd = crc2.createLinearGradient(0, 0, 700, 1110);
        grd.addColorStop(0, "#7eb6e9");

        crc2.fillStyle = grd;
        crc2.fill();
    }

    function drawHill(): void {
        crc2.beginPath();
        crc2.moveTo(0, 300);
        crc2.lineTo(1400, 700);
        crc2.lineTo(1400, 800);
        crc2.lineTo(0, 800);
        crc2.lineTo(0, 700);
        crc2.closePath();
        crc2.fillStyle = "#FFFFFF";
        crc2.fill();
    }

    function drawSun(): void {
        crc2.beginPath();
        crc2.arc(150, 100, 70, 0, 2 * Math.PI);
        crc2.fillStyle = "#fff91d";
        crc2.fill();
    }


    /*  function generateScore(): void {
          let score: Score = new Score();
          objects.push(score);
  }*/

    function drawScore(): void {
        crc2.beginPath();
        crc2.moveTo(50, 670);
        crc2.lineTo(300, 670);
        crc2.lineTo(300, 770);
        crc2.lineTo(50, 770);
        crc2.closePath();
        crc2.fillStyle = "#ffffff";
        crc2.fill();
        crc2.lineWidth = 3.5;
        crc2.strokeStyle = "#7eb6e9";
        crc2.stroke();

        crc2.font = "30px Quicksand";
        crc2.fillStyle = "#000000";
        crc2.fillText("Score", 135, 700);

    }

}