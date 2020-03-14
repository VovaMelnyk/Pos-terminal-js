import "../styles/payment-module.css"
class PaymentModule {
    constructor(sum) {
        this.sum = sum

    }

    renderForm() {
        return `<section class="payment_module">
        <div class="payment_module-wrapper">
            <div class="calculator__sidebar">
            <div class="calculator">
            
            <div class="buttons">
                            <div class="leftPanel">
                            <div class="numbers">
                            <div>50</div>
                  <div>100</div>
                  <div>200</div>
                  
                </div>
                <div class="numbers">
                  <div>7</div>
                  <div>8</div>
                  <div>9</div>
                </div>
                <div class="numbers">
                  <div>4</div>
                  <div>5</div>
                  <div>6</div>
                </div>
                <div class="numbers">
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                </div>
                <div class="numbers">
                  <div>0</div>
                  <div>.</div>
                  <div id="clear">C</div>
                </div>
              </div>
              
            </div>
          </div>
            </div>

            <div class="checkout">
                <form class="checkout__section">
                    <div class="checkout-wrapper">
                        <h2 class="checkout__title">
                            К оплате: <span id="checkout__sum"> ${this.sum} </span>₴</h2>
                             <div class="checkout__field">   
                                <div class="checkout__field-pay_cash">
                                    <span class="checkout__field-label">Наличными</span>
                                    <div class="checkout__field-cash">
                                        <div class = "checkout__field-cash-string"><div class="checkout__field-value" id="sum-value"></div><span class="checkout__field-currency">₴</span></div>
                                        
                                        <span class="checkout__field-rest">Сдача   <span class="checkout__rest-value">0</span> ₴</span>
                                    </div>
                                </div>
                                
                                                        



                            <div class="checkout__field-pay_card">
                                <span class="checkout__icon--card">Карточкой</span>
                                <div class="checkout__field-money">
                                    <div class="checkout__field-value" id="sum-card"></div>
                                    <span class="checkout__field-currency">₴</span>
                                </div>
                            </div>
                            </div>

                    </div>

                    <div class="checkout__close-navbar">
                        <span class="checkout__link--alert">
                            <a class="close-link" href="#">Закрыть без оплаты</a></span>
                        <button class="checkout__pay-button btn-small type="submit">Оплатить</button>
                    </div>
                </form>
            </div>
        </div>
    </section>`
    }
    addToScreen(container, position, element) {
        container.insertAdjacentHTML(position, element)
    }






    calculate() {
        let input = document.querySelector('#sum-value'), // input/output button
            number = document.querySelectorAll('.numbers div'), // number buttons
            operator = document.querySelectorAll('.operators div'), // operator buttons
            clear = document.querySelector('#clear'), // clear button
            resultDisplayed = false; // flag to keep an eye on what output is displayed
        let checkoutPayButton = document.querySelector(".checkout__pay-button")

        let checkoutField = document.querySelector(".checkout__field")
        let checkoutFieldPayCash = document.querySelector(".checkout__field-pay_cash");
        let checkoutFieldPayCard = document.querySelector(".checkout__field-pay_card");
        let checkoutFieldCard = document.querySelector("#sum-card")
        let sumValue = document.querySelector("#sum-value")
        let checkoutSum = document.querySelector("#checkout__sum")
        let restSum = document.querySelector('.checkout__rest-value')
        checkoutField.addEventListener('click', function() {
            if (checkoutFieldPayCash.classList.contains('checkout__table-active')) {
                checkoutFieldPayCash.classList.remove('checkout__table-active');
                checkoutFieldPayCard.classList.add('checkout__table-active');
                checkoutFieldCard.textContent = checkoutSum.textContent
                sumValue.textContent = ""
                restSum.textContent = "0"
                checkoutPayButton.disabled = true


            } else {
                checkoutFieldPayCash.classList.add('checkout__table-active');
                checkoutFieldPayCard.classList.remove('checkout__table-active');
                checkoutFieldCard.textContent = ""

                checkoutPayButton.classList.remove('active-pay-button')
                checkoutPayButton.disabled = true

            }
            if (Number(checkoutFieldCard.textContent) > 0) {
                checkoutPayButton.classList.add('active-pay-button')
                checkoutPayButton.disabled = false
            }




        });










        for (var idx = 0; idx < number.length; idx++) {
            checkoutFieldPayCash.classList.add('checkout__table-active');
            checkoutFieldPayCard.classList.remove('checkout__table-active');
            number[idx].addEventListener("click", function(e) {

                // storing current input string and its last character in variables - used later
                var currentString = input.textContent;
                var lastChar = currentString[currentString.length - 1];

                // if result is not diplayed, just keep adding
                if (resultDisplayed === false) {
                    input.textContent += e.target.textContent;
                    this.sumValue += e.target.textContent
                } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
                    // if result is currently displayed and user pressed an operator
                    // we need to keep on adding to the string for next operation
                    resultDisplayed = false;
                    input.textContent += e.target.textContent;
                } else {
                    // if result is currently displayed and user pressed a number
                    // we need clear the input string and add the new input to start the new opration
                    resultDisplayed = false;
                    input.textContent = "";
                    input.textContent += e.target.textContent;
                }
                let checkoutSum = document.querySelector('#checkout__sum')
                let restSum = document.querySelector('.checkout__rest-value')

                function getNumber() {
                    let sumValue = document.querySelector("#sum-value")
                    sumValue = Number(sumValue.textContent)
                    checkoutFieldPayCash.classList.add('checkout__table-active');
                    checkoutFieldPayCard.classList.remove('checkout__table-active');
                    checkoutFieldCard.textContent = ""
                    return sumValue
                }

                restSum.textContent = (getNumber() - Number(checkoutSum.textContent)) <= 0 ?
                    0 : getNumber() - Number(checkoutSum.textContent)


                checkoutPayButton.classList.remove('active-pay-button')

                if (Number(restSum.textContent) > 0) {
                    checkoutPayButton.classList.add('active-pay-button')
                    checkoutPayButton.disabled = false
                }



            });
        }

        // adding click handlers to number buttons
        for (var i = 0; i < operator.length; i++) {

            operator[i].addEventListener("click", function(e) {

                // storing current input string and its last character in variables - used later
                var currentString = input.textContent;
                var lastChar = currentString[currentString.length - 1];
                checkoutFieldPayCash.classList.add('checkout__table-active');
                checkoutFieldPayCard.classList.remove('checkout__table-active');
                // if last character entered is an operator, replace it with the currently pressed one
                if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
                    var newString = currentString.substring(0, currentString.length - 1) + e.target.textContent;
                    input.textContent = newString;
                } else if (currentString.length == 0) {
                    // if first key pressed is an opearator, don't do anything
                    console.log("enter a number first");
                } else {
                    // else just add the operator pressed to the input
                    input.textContent += e.target.textContent;
                }

            });

        }


        // clearing the input on press of clear
        clear.addEventListener("click", function() {
            let restSum = document.querySelector('.checkout__rest-value')
            restSum.textContent = 0

            input.textContent = ""
            checkoutPayButton.disabled = true


        })


    }


    start(container) {
        this.addToScreen(container, 'beforeend', this.renderForm());
        this.calculate()


    }
}



const paymentModule = new PaymentModule()
const mainContent = document.querySelector("#root")

paymentModule.start(mainContent)




// console.log(sumValue)
export default PaymentModule