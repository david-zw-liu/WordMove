class WordmoveController < ApplicationController
  def input
    wms = WordMoveService.new
    result = wms.work(params[:article])
    # 兔子嘲笑烏龜的步子爬的慢，但是他笑了，說總有一天他會和她賽跑，並且贏他。
    render json: result
  end
end
