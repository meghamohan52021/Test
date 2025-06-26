const fs = require('fs');

const syncGitHubFolders = async () => {
    try {
        console.log('Fetching GitHub repository contents...');
        
        const response = await fetch('https://api.github.com/repos/meghamohan52021/Test/contents');
        const data = await response.json();
        
        const folders = await Promise.all(
            data.filter(item => item.type === 'dir').map(async folder => {
                let description = 'No README found';
                try {
                    const readmeResponse = await fetch(`https://api.github.com/repos/meghamohan52021/Test/contents/${folder.path}/README.md`);
                    if (readmeResponse.ok) {
                        const readmeData = await readmeResponse.json();
                        const content = Buffer.from(readmeData.content, 'base64').toString('utf-8');
                        description = content.substring(0, 200) + (content.length > 200 ? '...' : '');
                    }
                } catch (error) {
                    console.log(`No README found for ${folder.name}`);
                }
                
                return {
                    name: folder.name,
                    path: folder.path,
                    url: folder.html_url,
                    description: description
                };
            })
        );

        fs.writeFileSync('./pattern_list.json', JSON.stringify(folders, null, 2));
        console.log(`Successfully updated pattern_list.json with ${folders.length} folders`);
        
        return folders;
    } catch (error) {
        console.error('Error syncing GitHub folders:', error);
        process.exit(1);
    }
};

syncGitHubFolders();
