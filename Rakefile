require 'ruby_libs/init'

namespace :ssbx do
  desc "Compiles all of the source files into ssbx.js"
  task :compile do
    source = ''
    Find.find('src/') do |path|
      if path.match /\.js/
        file_name = path.split('/').last
        source << "/* START #{file_name} */\n"
        source << File.read(path)
        source << "\n/* END #{file_name} */\n"
      end
    end
    File.open('ssbx.js', 'w') { |f| f.write(source) }
  end
  
  desc "Runs the tests"
  task :test do
  end
end