import web

def make_text(string):
   return string

urls = ('/', 'tutorial')
render = web.template.render('templates/')

app = web.application(urls, globals())

my_form = web.form.Form(
               web.form.Textbox('', class_='textfield', id='textfield'),
               )

class tutorial:
   def GET(self):
		parsed_path = urlparse.urlparse(self.path)
    	try:
        	params = dict([p.split('=') for p in parsed_path[4].split('&')])
    	except:
        	params = {}
        
   def POST(self):
       form = my_form()
       form.validates()
       s = form.value['textfield']
       return make_text(s)

if _name_ == '__main__':
   app.run()
