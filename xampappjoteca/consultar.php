<?php

$consultardatos=mysqli_query($con,"select * from registro");

$resultados=mysqli_fetch_array($consultardatos);
print_r($resultados);

?>
