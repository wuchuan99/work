<?php
    print_r($_POST);


    echo '-----------------------';
    print_r($_FILES);
    move_uploaded_file($_FILES["myfile"]["tmp_name"],"./upload/".$_FILES["myfile"]['name']);
?>