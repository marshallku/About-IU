const fs = require("fs");
const targetFile = "./dist/index.html";

function postbuild() {
    fs.readFile(targetFile, "utf8", async (error, data) => {
        if (error) console.error(error);

        const result = data.replace(
            /<title>About IU<\/title>/gm,
            `<?php $pathname=$_SERVER['REQUEST_URI'];$title='About IU';$desc='About IU';$img='https://marshall-ku.com/IU/assets/images/profile.jpeg';if($pathname!=='/IU/'){$path2=str_replace('/IU/','',$pathname);if(strpos($pathname,'Discography/')==false){if($path2=='Profile'){$title='아이유 프로필';$desc='아이유 프로필';}elseif($path2=='Discography'){$title='아이유 가사집';$desc='아이유 가사집';}elseif($path2=='Filmography'){$title='이지은 필모그래피';$desc='이지은 연기 활동 목록(필모그래피)';}elseif($path2=='Youtube'){$title='아이유 유튜브 피드';$desc='아이유 유튜브 피드';}else{$title='아이유 인스타그램 피드';$desc='아이유 인스타그램 피>드';}}else{$album=urldecode(str_replace('Discography/','',$path2));$title='아이유 '.$album.' 가사집';$desc='아이유 '.$album.' 가사집';$img='https://marshall-ku.com/IU/assets/images/album_cover/'.$album.'.jpg';}} ?><title><?php echo $title; ?></title><link rel="icon" href="/IU/favicon.ico"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="theme-color" content="#000000"/><meta class="meta-desc" name="description" content="<?php echo $desc; ?>"/><meta property="og:type" content="website"/><meta class="meta-url" property="og:url" content="https://marshall-ku.com/IU/"/><meta property="og:site_name" content="About IU"/><meta property="og:image" content="<?php echo $img; ?>"/><meta class="meta-title" property="og:title" content="<?php echo $title; ?>"/><meta class="meta-desc" property="og:description" content="<?php echo $desc; ?>"/><meta name="twitter:card" content="summary"/><meta name="twitter:site" content="@marshall_ku_"/><meta class="meta-title" name="twitter:title" content="<?php echo $title; ?>"/><meta class="meta-desc" property="twitter:description" content="<?php echo $desc; ?>"/><meta property="twitter:image" content="<?php echo $img; ?>"/>`
        );

        fs.writeFileSync(targetFile, result, (error) => {
            console.error(error);
        });

        fs.renameSync(targetFile, "./dist/index.php");

        console.log("Successfully changed to php");
    });
}

postbuild();
