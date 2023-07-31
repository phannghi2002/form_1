//Đối tượng
function Validator(options) {
    
    var selectorRules = {};

//Mục tiêu hàm validate dùng để trả về giá trị true hoặc false và đưa ra thông báo lỗi
    function validate(inputElement, rule1){
     // var errorMessage =rule1.test(inputElement.value);
/*rule1 này sẽ là từng hàm trong rules. Khi ta ấn vào fullname có nghĩa là ta 
đang gọi hàm isRequired và nó sẽ check đến hàm test trong giá trị mà ta nhập vào
và nó sẽ trả về giá trị tương ứng*/
        var errorMessage;
                
/*Lấy ra các rule của selector, vì selectorRules là một object vì thế muốn
thêm một đối tượng trong object ta dùng [], rules ở đây là 1 mảng chứa
1 hoặc nhiều giá trị của thuộc tính: selectorRules[rule.selector] =[rule.test];*/
        var rules = selectorRules[rule1.selector];
        
//Lặp qua từng rule và kiểm tra, nếu có lỗi dừng việc kiểm tra
        for(var i=0;i<rules.length;++i){

            switch(inputElement.type){
                case 'radio':
                case 'checkbox': 
                    errorMessage = rules[i](
                        formElement.querySelector(rule1.selector + ':checked')
/*:checked là chọn tất cả các selector có class là rule1.selector đã được 
người dùng chọn, nếu ko tìm thấy thì nó sẽ được gán bằng giá trị undefined
và nếu đặt nó trong câu lệnh if thì nó là false. Và khi nó là undefined 
thì hàm rules[i] sẽ ứng với hàm test trong hàm isRequired chẳng hạn, hàm 
test lấy đối số là value mà lúc này value ứng với giá trị undefined, lại có
trong hàm này khi ta gọi result = value ? undefined : message || 'Vui lòng nhập trường này';
mà value là undefined chính là giá trị falsy nên nó sẽ thực hiện câu lệnh 
sau : tức là  message || 'Vui lòng nhập trường này', câu lệnh trước : chỉ thực 
hiện khi value là giá trị truthy thôi. Và khi ko có ô nào được chọn checked 
thì result sẽ được gán bằng  message || 'Vui lòng nhập trường này'*/

/*Ở trên là trường hợp ko có ô nào được check thì sẽ in ra lỗi tương ứng. 
Nếu như trong trường hợp có ô nào được check thì sẽ thế nào? Khi câu lệnh
formElement.querySelector(rule1.selector + ':checked') thực thi nó sẽ trả về 
một thẻ input và khi dùng câu lệnh console.log(typeof formElement.querySelector(rule1.selector + ':checked'))
nó sẽ trả về object nên khi thực hiện hàm test trong isRequired nó sẽ thực hiện
câu lệnh if (typeof value === 'string') result = value.trim() ? undefined : message || 'Vui lòng nhập trường này';
            else result = value ? undefined : message || 'Vui lòng nhập trường này';
                return result; nó sẽ thực hiện câu lệnh trong else và trả về
result là undefined, vì đối số là input khác giá trị falsy. */
                    );

                    break;
               

                default:
                    errorMessage = rules[i](inputElement.value);
            }

            //errorMessage = rules[i](inputElement.value);
/*rule là 1 mảng chứa các hàm get của selector nào đó, inputElement.value
là giá trị mà người dùng nhập vào, bởi vì hàm test có đối số là giá trị 
của người dùng nhập vào, hàm test trả về một messgae được lưu vào errorMessage */
//vì nó là hàm nên cần truyền vào
            if(errorMessage) break;
/*Ta sẽ kiểm tra rule theo quy tắc từ trên xuống dưới, nghĩa là nếu hàm
rule đầu tiên trong 1 selector mà bị lỗi thì sẽ thoát khỏi vòng lặp, thì
errorMessage sẽ in ra lỗi đầu tiên, nếu rule đầu tiên hết lỗi thì nó
sẽ kiểm tra lỗi tiếp theo rồi đưa ra? Tại sao phải đưa nó vào mảng rồi xét 
từng cái lỗi một? bởi vì nếu ko lưu vào mảng hay object thì khi ta kiểm tra
nó chỉ in ra cái lỗi cuối cùng, do đó ta đưa vào mảng để lưu giá trị, sau 
đó dùng vòng lặp để xét lỗi */
        }

        //var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
/*Tại sao ta lại ko dùng parentElement mà lại dùng closest, là bởi vì nếu giả sử trong
trường hợp mà ta có nhiều hàm bên trong nó thì ko dùng được nữa
<div class="form-group">
                <label for="fullname" class="form-label">Tên đầy đủ</label>
                <input id="fullname" name="fullname" type="text" placeholder="VD: Sơn Đặng" class="form-control">
                <span class="form-message"></span>
  </div>  nếu thế này thì parent của fullname được nhưng nếu 

  <div class="form-group">
                <label for="fullname" class="form-label">Tên đầy đủ</label>
                <div>
                    <div> 
                        <input id="fullname" name="fullname" type="text" placeholder="VD: Sơn Đặng" class="form-control">
                    </div>
                </div>
                <span class="form-message"></span>
</div> thì ta phải dùng closest nó mới đúng*/
       // var errorElement = inputElement.closest('.form-group').querySelector(options.errorSelector);     
//nên dùng options.formGroup để tránh fix cứng, sau này còn dùng lại
        var errorElement = inputElement.closest(options.formGroup).querySelector(options.errorSelector);

        //var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
/*Câu lệnh khai báo trên là để lấy element form-message để in ra thông báo lỗi.
Tại sao anh Sơn lại không khai báo trực tiếp là querySelector('.form-message') mà
phải ghi thế cho rườm rà. Là bởi vì nếu ghi thế ta sẽ fix cứng nó,nghĩa là
khi ta từ file khác gọi vào thì nó sẽ ko chạy được, mà ta để thế để khi cần
gọi nó thì ta truyền từ bên ngoài vào. */

//câu lệnh này dùng để in ra lỗi và xóa lỗi
        if(errorMessage){
            errorElement.innerText = errorMessage;
            //inputElement.parentElement.classList.add('invalid');
            inputElement.closest(options.formGroup).classList.add('invalid');

//thông báo lỗi màu đỏ ở dưới phần ta nhập vào nếu lỗi
        } else {
            errorElement.innerText = '';
           // inputElement.parentElement.classList.remove('invalid');
            inputElement.closest(options.formGroup).classList.remove('invalid');

//xóa đi thông báo ở dưới ô input khi nhập đúng
        }
        // console.log(errorMessage)
        return !errorMessage;
/*!errorMessage có nghĩa là nếu biến này rỗng thì trả về true (nếu là undefined
vẫn trả về true) hay nếu hàm errorMessage mà ko lỗi thì trả về true, ngược lại là false.
 nếu errorMessage có lỗi thì có nghĩa là chuỗi khác rỗng (Ở đây là chuỗi 
'Vui lòng nhập trường này' -> trả về false)
*/
    }

    var formElement = document.querySelector(options.form);
//thằng này mục đích là lấycái thằng có id là: form-1 để thao tác.
    // console.log(options); nên dùng thằng này để xem lấy thằng nào tương ứng trong options

    if(formElement){
//Khi submit form 
        formElement.onsubmit = function(e){
            e.preventDefault();

            var isFormValid = true;
//Lặp qua từng rules và validate, validate có nhiệm vụ in ra lỗi và trả về true hoặc false
            options.rules.forEach(function(rule){
               // var inputElements = formElement.querySelectorAll(rule.selector);
                var inputElement = formElement.querySelector(rule.selector); //lấy selector ra để lấy giá trị hoặc làm các thứ khác...
/*Ta có rule ở đây là từng phần tử như Validator.isRequired('#fullname', 'Vui lòng nhập tên đầy đủ')-> kết quả phần tử này là 1 object,
có thể thử bằng console.log(typeof rule) -> muốn lấy được selector này ta phải dùng rule.selector. Ở đây ta dùng formElement mà ko dùng
document là bởi vì nếu như ttrong 1 trang web có nhiều form thì ta chỉ cần lấy 1 form có id là form-1 ra mà dùng thôi.*/
                var isValid=  validate(inputElement,rule);
//nếu hàm validate trả về true là ko lỗi

/*hàm này kiểm tra tất cả các ô input là rule đều ko có lỗi thì ta sẽ lấy ra toàn 
bộ dữ liệu người dùng nhập vào và in ra màn hình */
                if(!isValid){
/*isValid = false nếu có message trả về lỗi, nhưng nếu ta ko có ! thì nó 
vẫn false, mà false thì if ko thực hiện nên phải có ! phía trước. 
Còn nếu muốn chỗ câu if này mà ko dùng ! thì ta đưa isFormValid = false
rồi trong hàm if đưa isFormValid = true*/
                    isFormValid = false;
//nếu hàm ko lỗi thì thực hiện hàm dưới này, nếu có lỗi thì trả về false và bỏ qua hàm dưới này
                }
            });

            if(isFormValid){
        //Khi có thằng submit ở file js
                    if(typeof options.onSubmit === 'function'){
                        
                        var enableInputs =formElement.querySelectorAll('[name]:not([disabled])');
//Select tất cả thằng nào có attribute là name và không có attribute là disabled 
//nếu nhìn trong file HTML sẽ thấy các element input đều có attribute là name và không là name.
//Khi console.log(enableInputs) sẽ thấy nó trả về NodeList nên ta dùng Array.from(enableInputs)
//để đưa nó về mảng mới sử dụng được phương thức reduce, dùng reduce để đưa
//cái dữ liệu người dùng ra màn hình
console.log(Array.from(enableInputs))

                        var formValues = Array.from(enableInputs).reduce(function(values,input){
                        //nên console.log(Array.from(enableInputs)) nó ra cái gì rồi lấy cái đó để mà dùng
                        //ở đây nó là 4 cái ô input mà ta đã viết ở HTML, values là objetc{},
                        //input.name chính là tên name đặt ở HTML, input.value là giá trị người dùng nhập vào
                            //console.log(formValues);
                            switch(input.type){
                                case 'radio':
                                    if(!values[input.name]){
                                        values[input.name]=''
//Này tương tự như checkbox, ko bắt buộc nhập thì nó sẽ in ra chuỗi rỗng
                                    } 
                                    else {
                                        values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                    }
//Ta có khi cộng 1 chuỗi với 1 giá trị thì ta sẽ nhận được 1 chuỗi
//Mục đích của ta là: querySelector('input[name="sex"]:checked') với sex là giá trị của input.name
//console.log('input[name="' + input.name + '"]:checked')
//Chú ý chỉ có hàm console.log() thì dấu ngoặc '' hoặc "" mới không được in ra.
//Muốn in nó ra ta cần dùng \ phía trước '' hoặc ""
                                    break; 
                                case 'checkbox':  
                                    if(!values[input.name]){
                                        values[input.name]='';
/*Câu lệnh if ở này có tác dụng là nếu như giá trị của ô checkbox ta không 
bắt buộc yêu cầu phải nhập thì khi in ra nó sẽ hiển thị chuỗi rỗng. Câu lệnh
này có nghĩa là ban đầu ta xem mặc định giá trị của nó là '' bởi vì lúc này ta
mới bắt đầu khởi tạo object có key là input.name nên nó chưa có giá trị là 
điều bình thường. Sau khi thực hiện câu lệnh này xong mà mấy ô input tiếp theo ko có
giá trị thì nó sẽ vẫn lọt vào đây.Khi đã có giá trị trong ô input thì nó sẽ 
không lọt vào đây nữa. Có thể tạo 1 giá trị ở bên ngoài rồi console.log(++i) để
xem kết quả*/      
                                      
                                    }

                                    if(!input.matches(':checked')){   
  //                                     values[input.name]='';
/*Khi ta đặt thế này nó sẽ có lỗi khi in ra đó là chỉ khi nào ta chọn cái cuối cùng 
trong ô checkbox thì nó mới hiển thị tất cả các thông tin mà ta đã chọn vào trong 1 mảng
sau ta cái giá trị là bỏ trống.
Nguyên nhân rất đơn giản đó là khi ta chọn ô đầu tiên mà không chọn ô tiếp theo thì
thì đến khi ta lặp đến ô ko có giá trị này nó sẽ ghi đè lại từ thành mảng có nội dung
ta đã click thành cái chuỗi rỗng "",đó là tại sao ta click vào ô cuối cùng thì nó mới
lấy thông tin đưa vào 1 mảng.Để khắc phục lỗi này thì ta cần tách thành câu lệnh if 
ở trên.*/
                                        return values;
//Chỗ này ta đặt return luôn vì nếu thằng input này mà không được chọn
//thì return giúp chúng ta thoát khỏi câu lệnh switch case và đưa ra ngoài trả về return bên ngoài,
//nó giúp ta ko cần thực hiện các câu lệnh phía sau làm tăng hiệu suất
                                    }
                                    
                                    if(!Array.isArray(values[input.name])){
                                        values[input.name] = [];
//Trong vòng lặp đầu tiên thì nó sẽ chui vô đây tại vì nó ko phải là mảng, mà
//ta phải gán mảng cho nó để có gì nếu còn giá trị nào nữa ta đẩy vào mảng cho
//thuận tiện
                                    } 
                                    values[input.name].push(input.value);
//Nên nhớ 1 điều rằng values là object còn values[input.name] chính là giá trị
//của key có tên là input.name                                   
                                    break;
//Radio chỉ có 1 giá trị còn checkbox có nhiều giá trị nên ta cần đưa vào mảng để lấy
//hết được giá trị đó.
                                case 'file':
                                    values[input.name] = input.files;
                    //Để lấy nội dung trong file ta có thể dùng element trỏ đến ô input đó 
                    //và .files
                                    break;
                                default: 
                                    values[input.name] = input.value;
                            }
                            //values[input.name] = input.value;
                            //thêm một đối tượng vào trong object
                            return values;
                        },{});
                       // console.log(Array.from(enableInputs)) giúp ta xem toàn bộ
                       //thẻ input cần làm việc

//đưa dữ liệu ra màn hình, formValues ứng với dât bên file script
                        options.onSubmit(formValues);
                }
//trường hợp submit với HTML(hành vi mặc định)
                else {
                    formElement.submit();
                }
            }
        }

//Xử lý lặp qua mỗi rule và xử lý(lắng nghe sự kiện blur, input,...)
        options.rules.forEach(function(rule){
/* console.log(selectorRules[rule.selector]); sẽ thấy là undefined tại vì
ta truy cập vào thuộc tính rule.selector vào object rỗng nên nó trả về
undefined khác mảng do đó ta dùng nó để kiểm tra câu lệnh dưới đây*/

/*Chú ý thế này: selectorRules là 1 object, còn selectorRules[rule.selector]
thì chưa hẳn là 1 object. Tại sao? vì cái đó là lấy giá trị thuộc tính
của object có thể là 1object, mảng, chuỗi, số, boolean... VD như
var object = {name : 'Phan Nghị', age: 21} thì ta có 
object.[name] = 'Phan Nghị' với nó là 1 chuỗi, vì vậy khi hàm else được
xét thì ta gán cho nó giá trị là 1 mảng nên nó biến thành mảng, đó
là tại sao câu lệnh thứ 2 bắt đầu chạy vào trong câu lệnh if.
*/ 
            
//lưu lại các rules cho mỗi lần chạy
            if(Array.isArray(selectorRules[rule.selector])){
/*lần thứ 2 sẽ lọt vào đây, lần thứ 2 trở đi nó sẽ trở thành mảng, do đó
khi muốn thêm 1 phần tử thì ta dùng hàm push.*/
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] =[rule.test];
//gán nó thành mảng với 1 phần tử, bởi vì ban đầu nó là một object rỗng nên nó sẽ lọt vào đây
//object ko phải là mảng
            }

            var inputElements = formElement.querySelectorAll(rule.selector);
 /* console.log(inputElements), thực chất cái inputElements này chỉ dùng
 cho tất cả các thằng có sellector giống nhau thôi, như là giới tính hay
 sở thích sẽ có nhiều cái trùng name.Nó ở dạng nodeList nên cần chuyển thành
 mảng*/

            Array.from(inputElements).forEach(function(inputElement){
                
                    //Xử lý trường hợp blur khỏi input
                                    inputElement.onblur = function(){
                    //Có thể lấy được value thông qua hàm inputElement.value
                    // lấy hàm test thông qua rule.test
                                       validate(inputElement,rule);
                                    };
                    
                    /*Xử lý mỗi khi người dùng nhập vào input, hàm này có tác dụng là nếu như 
                    ban đầu có lỗi thì khi người dùng nhập vào thì lỗi sẽ biến mất đi*/
                                    inputElement.oninput = function(){
                                        errorElement.innerText = '';
                                      // inputElement.parentElement.classList.remove('invalid');
                                        inputElement.closest(options.formGroup).classList.remove('invalid');
                    
                                    };
            })


            var inputElement = formElement.querySelector(rule.selector);
//cái inputElement này là dành cho cái bọn chỉ có 1 class thôi, khác với cái ở trên nhé
            //var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
            var errorElement = inputElement.closest(options.formGroup).querySelector(options.errorSelector);

//             if(inputElement){
// //Xử lý trường hợp blur khỏi input
//                 inputElement.onblur = function(){
// //Có thể lấy được value thông qua hàm inputElement.value
// // lấy hàm test thông qua rule.test
//                    validate(inputElement,rule);
//                 };

// /*Xử lý mỗi khi người dùng nhập vào input, hàm này có tác dụng là nếu như 
// ban đầu có lỗi thì khi người dùng nhập vào thì lỗi sẽ biến mất đi*/
//                 inputElement.oninput = function(){
//                     errorElement.innerText = '';
//                   // inputElement.parentElement.classList.remove('invalid');
//                     inputElement.closest(options.formGroup).classList.remove('invalid');

//                 };
//             }
        });

    }
}
//Định nghĩa Rules
//Nguyên tắc của các Rules:
//1.Khi có lỗi => trả ra message lỗi
//2.Khi hợp lệ => không trả ra cái gì cả (undefined)
Validator.isRequired = function(selector,message){
    return {
        selector: selector,
//         test : function(value){
//                 return value ? undefined : message ||  'Vui lòng nhập trường này';
 
//     //return value.trim() ? undefined : message ||  'Vui lòng nhập trường này';
    
// /*Hàm trim dùng để loại bỏ dấu cách, nếu đúng thì gán nó bằng undefined,sai thì gán cho nó là message hoặc 'Vui lòng nhập trường này',
// bởi vì message xuất hiện trước chữ Vui lòng nhập trường này nên nếu ta có truyền message thì nó sẽ in ra message trước, ko có
// message thì nó mới in ra dòng chữ kia sau, có nghĩa là trong toán từ hoặc thì nó sẽ ưu tiên thằng nào xuất hiện trước tiên */
//         }

//cách này fix được lỗi bỏ trim trong hàm để thực hiện trong checkbox
        test: function (value) {
            var result;
            if (typeof value === 'string') result = value.trim() ? undefined : message || 'Vui lòng nhập trường này';
            else result = value ? undefined : message || 'Vui lòng nhập trường này';
                return result;
        },
    }
}
Validator.isEmail= function(selector, message){
    return {
        selector: selector,
        test : function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//này là biểu thức chính quy kiểm tra có lỗi hay ko có lỗi trong gmail
            return regex.test(value)? undefined : message || 'Vui lòng nhập đúng định dạng email';
        }
    }
}
Validator.minLength= function(selector,min,message){
    return {
        selector: selector,
        test : function(value){
            return value.length >= min ? undefined : message ||`Vui lòng nhập tối thiểu ${min} kí tự`
        }
    }
}

// var ele = document.querySelector('#form-1 #password');
// console.log(ele.value);
/*Nếu như bây giờ ta dùng hàm này bên trong rồi so sánh với nó ở dưới thì sẽ bị lỗi
bởi vì khi ta chạy file này thì 2 câu lệnh trên đã thực hiện rồi sau đó ta 
mới đem nhập giá trị của nó do đó nó câu lệnh return dưới này sẽ so sánh
nó với chuỗi rỗng chứ ko phải là so sánh với giá trị người dùng nhập vào */
    
// ele.onchange= function(){
//     console.log(ele.value)
// }
//Khi ta sử dụng câu lệnh ở trên mới lấy được dữ liệu từ người dùng 

Validator.isConfirmed= function(selector,getConfirmValue, message){
    return {
        selector: selector,
        test : function(value){
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
//Hàm return này có nghĩa là nếu ta nhập value giống với giá trị trả về của hàm này thì
//chấp nhận, khác thì báo lỗ, giá trị này ứng với hàm return bên file script bên kia
        }
    }
}



