require "./helpers/helpers.rb"
require "./helpers/breadcrumb.rb"
# The url will join {http_path} variable.

module ViewHelpers

  extend Helpers
  # load breadcrumb
  $breadcrumbs = Breadcrumb::Breadcurnbs.new File.expand_path('breadcrumbs.json')

  def new_link_to(name, href, options={})
    is_reference = $breadcrumbs.found_reference request.path, href
    href = File.join(Helpers::Path.get_http_path, href)
    href = ensure_path(href, '')
    if href == File.join(Helpers::Path.get_http_path, request.path) || is_reference
      options[:class] ||=''
      options[:class] += "active"
    end
    link_to name, href, options
  end

  # yaml data
  def data
    d||=YAML.load_file(File.join(File.dirname(__FILE__), 'data.yml'))
    return d
  end

  # nav li active link
  def nav_link_to(name, href, options={})
    if href == request.path.gsub('index.html', '')
      active = "active"
    end
    content_tag(:li, link_to(name, href, options), :class => active )
  end

end