
    // wedlock_multi_input.js       for taking input as a sentence

    // alekya_speech.js             for taking questions and checking nearest

    // wedlock_main.js              main js file for wedlock

    // wedlock_output.js            for displaying result and saving cookies

    // wedlock_add_to_corpus.js     for adding new words to corpus






    function add_to(category){
        document.getElementById('popup_msg').style.visibility = "hidden";
        document.getElementById('popup_msg').value = ''
        current_node
        new_word = temp
        var main_word = ''
        if(category == 'Any thing new'){
                array_data[current_node].push([new_word])
                main_word = current_node
                 update_corpus(new_word,main_word)
                 document.getElementById(current_node +"_result").value = new_word
        }
        else{
            document.getElementById(current_node +"_result").value = category
            for(let x in array_data[current_node]){
                if(array_data[current_node][x][0] == category){
    
                    array_data[current_node][x].push(new_word)
                    main_word = array_data[current_node][x][0]
                }
            }
        }
        console.log("data array" , array_data)
    }
    var flag = false
    
    function add_new_value_list(new_word, list,curr) {
        document.getElementById("popup_msg").innerHTML = ""
         for(let x=0;x<gloval.length;x++){
              document.getElementById("popup_msg").innerHTML += `<button onclick='add_to(this.innerHTML)'>${gloval[x]}</button>`
          }
           document.getElementById("popup_msg").innerHTML += `<button onclick='add_to(this.innerHTML)'>Any thing new</button>`
    
        return list;
    }
    if (flag == true) {
      document.getElementById("text").innerHTML = "word added !!";
    }
    function update_corpus(word,m_word){
        document.getElementById('corpus_word').value = word
        document.getElementById('corpus_word').value = m_word
        // $('#corpus_form').submit()
    }
    
     function update_nearest(){
         document.getElementById("corpus_form").submit();
     }
    
         document.querySelector("#corpus_form").addEventListener("submit", function(e){
            // if(!isValid){
            //  e.preventDefault();    //stop form from submitting
    
              var formData = new FormData(document.querySelector('#corpus_form'))
    
                $.ajax({
                    url: '/update_nearest',
                    type: 'POST',
                    data: formData,
                    async: false,
                    success: function (data) {
                        console.log(data)
                    },
                    error: function(xhr, textStatus, error){
                        console.log(xhr.statusText);
                        console.log(textStatus);
                        console.log(error);
                    },
                    dataType: 'JSON',
                    cache: false,
                    contentType: false,
                    processData: false
                });
                return false;
            // }
    
    
        });