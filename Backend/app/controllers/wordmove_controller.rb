class WordmoveController < ApplicationController
  def input
    wms = WordMoveService.new
    result = wms.work(params[:article])
    # 兔子嘲笑烏龜的步子爬的慢，但是他笑了，說總有一天他會和她賽跑，並且贏他。
    render json: result
  end

  def save_result
    r = Result.create(:content => JSON.generate(JSON.parse(request.raw_post)["data"]))

    params[:data].each do |item|
      selectedIndex = item["selectedImgIndex"]
      if(selectedIndex)
        image = item["images"]
        Gif.where(url: image[selectedIndex]).update_all("count = count + 1")
      end
    end

    render json: { id: r.id }
  end

  def get_result
    r = Result.find(params[:id])
    render json: JSON.parse(r.content)
  end
end
