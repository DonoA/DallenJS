<html>
    <body>
        <div id="main">
            <?php
                if(isset($_GET['url']) && !empty($_GET['url'])) {
                    $log = "ACCESSLOG";
                    if(!file_exists($log)){
                        $fh = fopen($log, 'x') or die("can't open log file 1");
                        fclose($fh);
                    }
                    $msg = "MESSAGES";
                    if(!file_exists($msg)){
                        $fh = fopen($msg, 'x') or die("can't open message file");
                        fclose($fh);
                    }
                    $fh = fopen($log, 'a') or die("can't open log file 2");
                    fwrite($fh, $_SERVER['REMOTE_ADDR'].": ".$_GET['url']."\n");
                    fclose($fh);
                    if($_GET['url'] == 'log'){
                        $fh = fopen($log, 'r') or die("can't open log file 3");
                        echo str_replace("\n", "<br>", fread($fh, filesize($log)));
                        fclose($fh);
                    }else{
                        if(isset($_GET['noparse']) && !empty($_GET['noparse']) && $_GET['noparse'] == "true"){
                            echo (string)file_get_contents($_GET['url']);
                        }else{
                            $url = $_GET['url'];
                            $url = str_replace('https://', 'http://', $url);
                            if(strpos($url, 'http://') === FALSE){
                                $url = 'http://'.$url;
                            }
                            if(strpos($url, '/', 9) === FALSE){
                                $url = $url.'/';
                            }
                            $dat = (string)file_get_contents($url);
                            $baseurl = substr($url, 0, strpos($url, '/', 9))."/";
                            $basefetch = "http://".$_SERVER['SERVER_NAME'].'/?url='; 
                            $fetchurl = $basefetch.$baseurl;
                            $find = array("http", "//", "", "/http", "/");
                            $rep = array($basefetch."http", $basefetch."http://", "/", "http", $fetchurl);
                            for($i = 0; $i < count($find); ++$i){
                                $dat = str_replace(
                array('href="'.$find[$i], 'src="'.$find[$i], 'content="'.$find[$i], "href='".$find[$i], "src='".$find[$i], "content='".$find[$i]), 
                array('href="'.$rep[$i], 'src="'.$rep[$i], 'content="'.$rep[$i], "href='".$rep[$i], "src='".$rep[$i], "content='".$rep[$i]), $dat);
                            }
                            $doc = new DOMDocument();
                            @$doc->loadHTML($dat);
                            $imgs = $doc->getElementsByTagName('img');
                            foreach ($imgs as $img) {
                                $oldsrc = $img->getAttribute('src');
                                $oldsrc = str_replace($basefetch, '', $oldsrc);
                                $img->setAttribute('src', 'data:image/png;base64,'.base64_encode(file_get_contents($oldsrc)));
                            }
                            $dat = $doc->saveHTML();
                            echo $dat;
                        }
                    }
                    
                }else{
                    echo '<input type="url" id="url"/>';
                    echo '<button type="button" onClick="location = location.protocol + &quot;//&quot; + location.host + &quot;?url=&quot; + document.getElementById(&quot;url&quot;).value + &quot;&noparse=&quot; + document.getElementById(&quot;url&quot;).checked;">fetch</button>';
                    echo '<br>no parse<input type="checkbox" id="np"/>';
                    echo '<hr>';
                    $msg = "MESSAGES";
                    $fh = fopen($msg, 'r') or die("can't open file");
                    echo str_replace("\n", "<br>", fread($fh, filesize($msg)));
                    fclose($fh);
                }
            ?>
        </div>
    </body>
    
</html>